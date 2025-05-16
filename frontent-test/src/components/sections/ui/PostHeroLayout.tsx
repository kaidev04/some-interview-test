import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FeaturedImage } from "../../ui"
import type { WordPressPost, WordPressMedia } from "@/types/wp-content-types"

interface PostHeroLayoutProps {
  post: WordPressPost
  media?: WordPressMedia | null
  variant?: 'hero' | 'featured'
  badge?: {
    text: string
    className?: string
  }
  contentSlot?: React.ReactNode
  imageSlot?: React.ReactNode
  className?: string
  animationClasses?: string
}

export function PostHeroLayout({
  post,
  media,
  variant = 'featured',
  badge,
  contentSlot,
  imageSlot,
  className = '',
  animationClasses = ''
}: PostHeroLayoutProps) {
  const isHero = variant === 'hero'
  
  // Create a default media object for when media is null/undefined
  const defaultMedia: WordPressMedia = {
    id: 0,
    source_url: "/placeholder.jpg",
    alt_text: "",
    media_details: {
      width: 1200,
      height: 800,
      sizes: {
        full: {
          source_url: "/placeholder.jpg",
          width: 1200,
          height: 800,
        }
      }
    },
    title: {
      rendered: ""
    }
  }

  return (
    <section className={`relative ${isHero ? 'bg-gradient-to-b from-emerald-50 to-white' : 'bg-emerald-50'} py-12 md:py-20 overflow-hidden ${className}`}>
      <div className="container mx-auto px-4">
        <div className={`${isHero ? 'max-w-7xl' : 'max-w-5xl'} mx-auto`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content Side */}
            <div className={`${animationClasses} transition-all duration-700 ease-out`}>
              <div className="max-w-xl">
                {badge && (
                  <span className={`inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full transition-colors ${badge.className || 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'}`}>
                    {badge.text}
                  </span>
                )}
                {contentSlot}
              </div>
            </div>

            {/* Image Side */}
            <div className={`${animationClasses} ${isHero ? 'delay-300' : ''} transition-all duration-700 ease-out`}>
              {imageSlot || (
                <div className={`relative ${isHero ? 'rounded-xl shadow-xl hover:scale-[1.01]' : 'h-[300px] md:h-[350px] rounded-xl shadow-lg'} overflow-hidden transition-transform duration-300`}>
                  <FeaturedImage
                    media={media || defaultMedia}
                    size="full"
                    priority={true}
                    className={isHero ? "aspect-[16/9] md:aspect-[4/3]" : ""}
                    fill={!isHero}
                    withHoverEffect={isHero}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements for hero variant */}
      {isHero && (
        <>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-100 opacity-30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-emerald-200 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </>
      )}
    </section>
  )
} 