"use client"

import { useEffect, useRef } from "react"
import { FeaturedImage } from "../ui"
import { decodeHtml, formatDate } from "@/utils/html"
import type { PostHeroProps } from "./types"

export function PostHero({ post, media, author }: PostHeroProps) {
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
  )
} 