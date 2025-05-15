"use client"

import Image from "next/image"
import { useState } from "react"
import type { WordPressMedia } from "../types/wordpress"

interface FeaturedImageProps {
  media: WordPressMedia
  size?: "thumbnail" | "medium" | "large" | "full"
  className?: string
  priority?: boolean
  fill?: boolean
  withHoverEffect?: boolean
}

export default function FeaturedImage({
  media,
  size = "large",
  className = "",
  priority = false,
  fill = false,
  withHoverEffect = false,
}: FeaturedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  if (!media) return null

  const imageSize = media?.media_details?.sizes[size] || media?.media_details?.sizes?.full || {
    source_url: '',
    width: 800,
    height: 600
  }
  const imageUrl = imageSize?.source_url || media?.source_url
  const altText = media?.alt_text || media?.title?.rendered || "Featured image"

  const hoverClass = withHoverEffect
    ? "transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
    : ""

  const loadingClass = isLoading ? "blur-sm" : "blur-0"

  return (
    <div className={`relative overflow-hidden ${className} ${withHoverEffect ? "group" : ""}`}>
      {fill ? (
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover ${hoverClass} ${loadingClass} transition-all duration-300`}
          priority={priority}
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={altText}
          width={imageSize?.width || 800}
          height={imageSize?.height || 600}
          className={`object-cover w-full h-auto ${hoverClass} ${loadingClass} transition-all duration-300`}
          priority={priority}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  )
}
