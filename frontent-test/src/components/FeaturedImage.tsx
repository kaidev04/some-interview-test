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

  // Always use the full-size image for best quality
  const fullSizeImage = media?.media_details?.sizes?.full || media
  const imageUrl = fullSizeImage?.source_url || media?.source_url
  const altText = media?.alt_text || media?.title?.rendered || "Featured image"

  // Get original dimensions
  const width = media?.media_details?.width || 800
  const height = media?.media_details?.height || 600

  console.log('Image quality details:', {
    url: imageUrl,
    originalWidth: width,
    originalHeight: height,
    aspectRatio: (width / height).toFixed(2),
    sourceSize: 'full',
    fullSizeDetails: media?.media_details?.sizes?.full,
    allAvailableSizes: Object.entries(media?.media_details?.sizes || {}).map(([key, value]: [string, any]) => ({
      size: key,
      dimensions: `${value.width}x${value.height}`,
      url: value.source_url
    }))
  })

  const hoverClass = withHoverEffect
    ? "transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
    : ""

  // Remove blur effect from loading state
  const loadingClass = ""

  // If no valid URL, show placeholder
  if (!imageUrl) {
    return (
      <div className={`relative overflow-hidden ${className} ${withHoverEffect ? "group" : ""}`}>
        <div className="absolute inset-0 bg-gray-200" />
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
          sizes="100vw"
          className={`object-cover w-full h-full ${hoverClass}`}
          style={{ position: 'absolute', inset: 0 }}
          priority={priority}
          loading="eager"
          quality={100}
          onLoadingComplete={() => {
            setIsLoading(false)
            console.log('Image loaded successfully:', imageUrl)
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
          className={`object-cover w-full h-auto ${hoverClass}`}
          priority={priority}
          loading="eager"
          quality={100}
          onLoadingComplete={() => {
            setIsLoading(false)
            console.log('Image loaded successfully:', imageUrl)
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
