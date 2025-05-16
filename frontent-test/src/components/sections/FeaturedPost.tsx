"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { WordPressPost, WordPressMedia } from "@/types/wp-content-types"
import { formatDate, decodeHtml } from "@/utils/html"

interface FeaturedPostProps {
  post: WordPressPost
  media?: WordPressMedia | null
}

export function FeaturedPost({ post, media }: FeaturedPostProps) {
  const title = decodeHtml(post.title.rendered)
  const imageUrl = media?.source_url || '/placeholder.jpg'

  return (
    <div className="bg-emerald-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fadeIn">
              <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full hover:bg-emerald-200 transition-colors">
                Utvalt inlägg
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {title}
              </h1>
              <div
                className="text-gray-600 mb-6 text-base italic font-light"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <span>{formatDate(post.date)}</span>
              </div>
              <Link
                href={`/post/${post.slug}`}
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all hover:shadow-md group"
              >
                Läs Mer
                <ArrowRight
                  size={18}
                  className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
            <div className="relative h-[300px] md:h-[350px] rounded-xl overflow-hidden shadow-lg animate-slideUp">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-all duration-300"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 