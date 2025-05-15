"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { WordPressPost, WordPressMedia } from "@/types/wordpress"
import FeaturedImage from "./FeaturedImage"
import { sanitizeHtml, stripHtml, formatDate } from "@/utils/html"

interface HeroSectionProps {
  post: WordPressPost
  media: WordPressMedia
}

export default function HeroSection({ post, media }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const animationClasses = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"

  return (
    <section className="relative bg-gradient-to-b from-emerald-50 to-white py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className={`transition-all duration-700 ease-out ${animationClasses}`}>
            <div className="max-w-xl">
              <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full">
                Featured Story
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{post.title.rendered}</h1>
              <div
                className="text-gray-600 mb-6 text-lg"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.excerpt.rendered) }}
              />
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="mx-2">•</span>
                <span>{stripHtml(post.content.rendered).split(" ").length / 200} min read</span>
              </div>
              <Link
                href={`/post/${post.slug}`}
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors group"
              >
                Read Full Story
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className={`transition-all duration-700 ease-out delay-300 ${animationClasses}`}>
            <div className="relative rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
              <FeaturedImage media={media} size="full" priority={true} className="aspect-[16/9] md:aspect-[4/3]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-100 opacity-30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-emerald-200 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
    </section>
  )
}
