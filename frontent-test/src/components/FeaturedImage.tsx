"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
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
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!media) {
    console.warn('No media provided to FeaturedImage component')
    return null
  }

  // Get the image URL with fallbacks
  const imageSize = media?.media_details?.sizes[size] || media?.media_details?.sizes?.full
  const imageUrl = imageSize?.source_url || media?.source_url
  const altText = media?.alt_text || media?.title?.rendered || "Featured image"

  // Get dimensions
  const width = imageSize?.width || media?.media_details?.width || 800
  const height = imageSize?.height || media?.media_details?.height || 600

  console.log('Image details:', {
    url: imageUrl,
    width,
    height,
    fill,
    priority,
    size,
    className
  })

  const hoverClass = withHoverEffect
    ? "transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
    : ""

  const loadingClass = isLoading ? "blur-sm" : "blur-0"

  // If no valid URL, show placeholder
  if (!imageUrl) {
    return (
      <div className={`relative overflow-hidden ${className} ${withHoverEffect ? "group" : ""}`}>
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </div>
    )
  }

  return (
    <div 
      className={`relative overflow-hidden ${className} ${withHoverEffect ? "group" : ""}`}
      style={fill ? { position: 'relative', width: '100%', height: '100%' } : undefined}
    >
      {fill ? (
        <Image
          src={imageUrl}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover w-full h-full ${hoverClass} ${loadingClass}`}
          style={{ position: 'absolute', inset: 0 }}
          priority={priority}
          onLoadingComplete={() => {
            console.log('Image loaded successfully:', imageUrl)
            setIsLoading(false)
          }}
          onError={(e) => {
            console.error('Image failed to load:', imageUrl)
            setError('Failed to load image')
          }}
        />
      ) : (
        <Image
          src={imageUrl}
          alt={altText}
          width={width}
          height={height}
          className={`object-cover w-full h-auto ${hoverClass} ${loadingClass}`}
          priority={priority}
          onLoadingComplete={() => {
            console.log('Image loaded successfully:', imageUrl)
            setIsLoading(false)
          }}
          onError={(e) => {
            console.error('Image failed to load:', imageUrl)
            setError('Failed to load image')
          }}
        />
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          {error}
        </div>
      )}
    </div>
  )
}
