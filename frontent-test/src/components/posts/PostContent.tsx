"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { FeaturedImage } from "../ui"
import { sanitizeHtml } from "@/utils/html-parser"
import { formatDate, decodeHtml } from "@/utils/html"
import type { PostContentProps } from "./types"

export function PostContent({ post, media, author }: PostContentProps) {
  const router = useRouter()
  const heroRef = useRef<HTMLDivElement>(null)
  const defaultMedia = {
    id: 0,
    source_url: "/placeholder.svg?height=800&width=1200",
    alt_text: "",
    media_details: {
      width: 1200,
      height: 800,
      sizes: {
        medium: {
          source_url: "/placeholder.svg?height=200&width=300",
          width: 300,
          height: 200,
        },
        full: {
          source_url: "/placeholder.svg?height=800&width=1200",
          width: 1200,
          height: 800,
        },
      },
    },
    title: {
      rendered: "",
    },
  }

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

  return (
    <article className="bg-white -mt-[64px]">
      {/* Hero section with parallax */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full">
            <FeaturedImage 
              media={media || defaultMedia} 
              size="full" 
              priority={true} 
              fill={true} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
        </div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{decodeHtml(post.title.rendered)}</h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-gray-200">
              <div className="flex items-center">
                <span>Publicerad <time dateTime={post.date}>{formatDate(post.date)}</time></span>
              </div>

              {author && (
                <div className="flex items-center">
                  <span className="inline-block w-1 h-1 rounded-full bg-gray-400 mr-4"></span>
                  <span>Av {author.name}</span>
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
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-gray-600 hover:text-emerald-600 mb-8 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to posts
            </button>

            {/* Main content */}
            <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(post.content.rendered),
                }}
                className="post-content [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_p:has(img)]:flex [&_p:has(img)]:flex-wrap [&_p:has(img)]:gap-4 [&_p_img]:w-full [&_p_img]:md:max-w-[calc(50%-8px)] [&_p_img]:flex-1 [&_p:has(img)]:justify-center [&_img]:rounded-xl [&_img]:my-2 prose-img:my-2 [&_p]:mb-6 prose-headings:mb-2 prose-headings:mt-4 [&_br]:content-[''] [&_br]:leading-[0.5] [&_p:not(:has(img))]:block [&_strong]:inline-block [&_strong]:mb-1 [&_video]:w-full [&_video]:h-auto [&_video]:rounded-xl [&_video]:my-4 [&_.wp-video]:w-full [&_.wp-video]:max-w-full [&_.wp-video]:my-4 [&_.wp-video-shortcode]:w-full [&_.wp-video-shortcode]:h-auto"
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
              {/* Newsletter signup */}
              <div className="bg-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Subscribe to our newsletter</h3>
                <p className="text-gray-600 mb-4">Get the latest news and updates delivered to your inbox.</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white font-medium py-3 rounded-xl hover:bg-emerald-700 transition-colors"
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