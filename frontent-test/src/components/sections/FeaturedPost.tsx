"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { WordPressPost, WordPressMedia } from "@/types/wp-content-types"
import { formatDate, decodeHtml } from "@/utils/html"
import { PostHeroLayout } from "./ui/PostHeroLayout"

interface FeaturedPostProps {
  post: WordPressPost
  media?: WordPressMedia | null
}

export function FeaturedPost({ post, media }: FeaturedPostProps) {
  const title = decodeHtml(post.title.rendered)

  const content = (
    <>
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
        Läs mer
        <ArrowRight
          size={18}
          className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </>
  )

  return (
    <PostHeroLayout
      post={post}
      media={media}
      variant="featured"
      badge={{ text: "Utvalt inlägg" }}
      contentSlot={content}
      animationClasses="animate-fadeIn"
    />
  )
} 