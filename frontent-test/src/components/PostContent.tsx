"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import type { WordPressPost, WordPressMedia, Category } from "../types/wordpress"
import FeaturedImage from "./FeaturedImage"
import CategoryBadge from "./CategoryBadge"
import { sanitizeHtml, estimateReadTime } from "@/utils/html-parser"
import { formatDate } from "@/utils/html"

interface Author {
  name: string
  id: number
}

interface PostContentProps {
  post: WordPressPost
  media: WordPressMedia
  categories?: Category[]
  author?: Author
  relatedPosts?: Array<{
    post: WordPressPost
    media: WordPressMedia
  }>
}

export default function PostContent({ post, media, categories = [], author, relatedPosts = [] }: PostContentProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageUrl = media?.source_url || "/placeholder.svg?height=600&width=1200"

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return

      const scrollY = window.scrollY
      const heroElement = heroRef.current

      // Apply parallax effect
      heroElement.style.transform = `translateY(${scrollY * 0.2}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const readTime = estimateReadTime(post.content.rendered)

  return (
    <article className="bg-white">
      {/* Hero section with parallax */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 -z-10">
          <FeaturedImage media={media} size="full" priority={true} fill={true} className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="max-w-3xl text-white">
            {categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <CategoryBadge key={category.id} category={category} size="lg" />
                ))}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title.rendered}</h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-gray-200">
              <div className="flex items-center">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>

              <div className="flex items-center">
                <span className="inline-block w-1 h-1 rounded-full bg-gray-400 mr-4"></span>
                <Clock size={16} className="mr-1" />
                <span>{readTime} min read</span>
              </div>

              {author && (
                <div className="flex items-center">
                  <span className="inline-block w-1 h-1 rounded-full bg-gray-400 mr-4"></span>
                  <span>By {author.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            {/* Back to posts link */}
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-emerald-600 mb-8 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to posts
            </Link>

            {/* Main content */}
            <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(post.content.rendered),
                }}
                className="post-content"
              />
            </div>

            {/* Share buttons */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-medium text-gray-700 flex items-center">
                  <Share2 size={18} className="mr-2" />
                  Share this article:
                </span>

                <div className="flex gap-2">
                  <button
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={18} />
                  </button>
                  <button
                    className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={18} />
                  </button>
                  <button
                    className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {relatedPosts.map(({ post: relatedPost, media: relatedMedia }) => (
                      <Link key={relatedPost.id} href={`/post/${relatedPost.slug}`} className="flex gap-4 group">
                        <FeaturedImage
                          media={relatedMedia}
                          size="thumbnail"
                          className="w-20 h-20 rounded-lg flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                            {relatedPost.title.rendered}
                          </h4>
                          <time dateTime={relatedPost.date} className="text-sm text-gray-500">
                            {formatDate(relatedPost.date)}
                          </time>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter signup */}
              <div className="bg-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Subscribe to our newsletter</h3>
                <p className="text-gray-600 mb-4">Get the latest news and updates delivered to your inbox.</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white font-medium py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
