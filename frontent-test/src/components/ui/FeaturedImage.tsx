"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import type { FeaturedImageProps } from "./types"

export function FeaturedImage({
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

  const hoverClass = withHoverEffect
    ? "transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
    : ""

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