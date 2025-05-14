"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, MessageSquare, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import type { WordPressPost, WordPressMedia } from "@/types/wordpress"
import { sanitizeHtml, stripHtml } from "@/utils/html"

// Sample data based on the provided JSON
const samplePosts: WordPressPost[] = [
  {
    id: 16328,
    date: "2025-05-12T14:32:53",
    slug: "swenstromskas-stenugnsbageri-till-bergvik",
    title: {
      rendered: "Swenströmskas Stenugnsbageri till Bergvik",
    },
    content: {
      rendered:
        "<p>Vi är superglada att kunna berätta att familjeföretaget Swenströmskas Stenugnsbageri öppnar hos oss på Bergvik!<br />\nSwenströmskas Stenugnsbageri är ett hantverksbageri som bakar med surdeg i stenugn. Verksamheten består av bageri, konditori och kallskänk och allt görs från grunden.</p>\n<p>Samma goda sortiment som finns på bageriet i stan kommer erbjudas på Bergvik. Stilen på inredningen kommer att vara det samma och framförallt så kommer de gulliga kopparna till kaffet också att följa med.</p>\n<p>&nbsp;</p>\n",
    },
    excerpt: {
      rendered:
        "<p>Vi är superglada att kunna berätta att familjeföretaget Swenströmskas Stenugnsbageri öppnar hos oss på Bergvik! Swenströmskas Stenugnsbageri är ett hantverksbageri som bakar med surdeg i stenugn. Verksamheten består av bageri, konditori och kallskänk och allt görs från grunden. Samma goda sortiment som finns på bageriet i stan kommer erbjudas på Bergvik. Stilen på inredningen kommer [&hellip;]</p>\n",
    },
    featured_media: 16329,
  },
  {
    id: 16091,
    date: "2025-04-04T15:24:49",
    slug: "premiar-arets-smakradstips",
    title: {
      rendered: "Premiär för årets Smakrådstips på Bergvik",
    },
    content: {
      rendered:
        '<p>Först ut är Ella, som i en ny film delar med sig av sina personliga favoriter och hjälper Ida Hallquist att bli redo för vårsäsongen – missa inte det!</p>\n<p><strong>Vill du ha ännu mer inspiration?</strong><br />\nUtforska hela smakteamet och ta del av trendspaningar, produktfavoriter och säsongens bästa idéer.</p>\n<p>👉 <a href="https://bergvik.se/smakradet/tips/beautyrutin/">Se filmen här</a><br />\n👉 <a href="https://bergvik.se/smakradet/">Upptäck årets smakprofiler och deras bästa tips</a></p>\n',
    },
    excerpt: {
      rendered:
        "<p>Först ut är Ella, som i en ny film delar med sig av sina personliga favoriter och hjälper Ida Hallquist att bli redo för vårsäsongen – missa inte det! Vill du ha ännu mer inspiration? Utforska hela smakteamet och ta del av trendspaningar, produktfavoriter och säsongens bästa idéer. 👉 Se filmen här 👉 Upptäck årets [&hellip;]</p>\n",
    },
    featured_media: 16093,
  },
  // Add more posts as needed
]

// Sample media data
const sampleMedia: Record<number, WordPressMedia> = {
  16329: {
    id: 16329,
    source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild.jpg",
    alt_text: "Stenugnsbageri",
    media_details: {
      sizes: {
        medium: {
          source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild-300x200.jpg",
          width: 300,
          height: 200,
        },
        full: {
          source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild.jpg",
          width: 2048,
          height: 1363,
        },
      },
    },
    title: {
      rendered: "Pressbild",
    },
  },
  16093: {
    id: 16093,
    source_url: "/placeholder.svg?height=800&width=1200",
    alt_text: "Smakrådstips",
    media_details: {
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
      rendered: "Smakrådstips",
    },
  },
  // Add more media as needed
}

// Sample related posts
const sampleRelatedPosts: Record<number, WordPressPost[]> = {
  16328: [
    {
      id: 16091,
      date: "2025-04-04T15:24:49",
      slug: "premiar-arets-smakradstips",
      title: {
        rendered: "Premiär för årets Smakrådstips på Bergvik",
      },
      excerpt: {
        rendered: "<p>Först ut är Ella, som i en ny film delar med sig av sina personliga favoriter...</p>",
      },
      featured_media: 16093,
    },
    {
      id: 16071,
      date: "2025-04-03T15:22:51",
      slug: "vaccindirekt-oppnar-pa-bergvik",
      title: {
        rendered: "VaccinDirekt öppnar på Bergvik!",
      },
      excerpt: {
        rendered: "<p>11 april öppnar Vaccindirekt hos oss på Bergvik...</p>",
      },
      featured_media: 16073,
    },
  ],
}

// Sample comment counts
const sampleCommentCounts: Record<number, number> = {
  16328: 5,
  16091: 3,
  16071: 2,
  16068: 7,
  15942: 1,
  15793: 0,
  15684: 4,
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

function estimateReadTime(content: string): number {
  const text = stripHtml(content)
  const wordsPerMinute = 200
  const numberOfWords = text.split(/\s/g).length
  return Math.ceil(numberOfWords / wordsPerMinute)
}

interface PostPageProps {
  params: {
    slug: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Find the post by slug
  const post = samplePosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const media = sampleMedia[post.featured_media]
  const relatedPosts = sampleRelatedPosts[post.id] || []
  const commentCount = sampleCommentCounts[post.id] || 0
  const readTime = estimateReadTime(post.content.rendered)

  useEffect(() => {
    setIsVisible(true)

    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <article className="bg-white">
      {/* Hero section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-1000"
          style={{ transform: isVisible ? "translateY(0)" : "translateY(-20px)" }}
        >
          <Image
            src={media?.source_url || "/placeholder.svg"}
            alt={media?.alt_text || post.title.rendered}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative">
          <div
            className="max-w-3xl text-white transition-all duration-700"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              opacity: isVisible ? 1 : 0,
            }}
          >
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

              {commentCount > 0 && (
                <div className="flex items-center">
                  <span className="inline-block w-1 h-1 rounded-full bg-gray-400 mr-4"></span>
                  <MessageSquare size={16} className="mr-1" />
                  <span>{commentCount} comments</span>
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
              className="inline-flex items-center text-gray-600 hover:text-emerald-600 mb-8 transition-colors group"
            >
              <ArrowLeft size={18} className="mr-2 transform transition-transform group-hover:-translate-x-1" />
              Back to posts
            </Link>

            {/* Main content */}
            <div
              className="prose prose-lg max-w-none transition-opacity duration-700 delay-300"
              style={{ opacity: isVisible ? 1 : 0 }}
            >
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
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors hover:scale-110"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={18} />
                  </button>
                  <button
                    className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors hover:scale-110"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={18} />
                  </button>
                  <button
                    className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors hover:scale-110"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Comments section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageSquare size={24} className="mr-2 text-emerald-600" />
                Comments ({commentCount})
              </h3>

              {commentCount > 0 ? (
                <div className="space-y-6">
                  {/* Sample comments */}
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 mr-4"></div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h5 className="font-medium text-gray-800 mr-3">John Doe</h5>
                          <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-gray-600">
                          This is great news! I've been waiting for a good bakery to open at Bergvik. Looking forward to
                          trying their sourdough bread.
                        </p>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium mt-2">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* More comments would be here */}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-gray-600 mb-2">No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}

              {/* Comment form */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium text-gray-800 mb-4">Leave a comment</h4>
                <form>
                  <div className="mb-4">
                    <textarea
                      placeholder="Your comment"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all hover:shadow-md"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div
              className="sticky top-28 transition-all duration-700 delay-500"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                opacity: isVisible ? 1 : 0,
              }}
            >
              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/post/${relatedPost.slug}`} className="flex gap-4 group">
                        <div className="relative w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden">
                          <Image
                            src={sampleMedia[relatedPost.featured_media]?.source_url || "/placeholder.svg"}
                            alt={relatedPost.title.rendered}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="80px"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                            {relatedPost.title.rendered}
                          </h4>
                          <time className="text-sm text-gray-500" dateTime={relatedPost.date}>
                            {formatDate(relatedPost.date)}
                          </time>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter signup */}
              <div className="bg-emerald-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Subscribe to our newsletter</h3>
                <p className="text-gray-600 mb-4">Get the latest news and updates delivered to your inbox.</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white font-medium py-3 rounded-lg hover:bg-emerald-700 transition-all hover:shadow-md"
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
