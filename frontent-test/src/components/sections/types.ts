import type { WordPressPost, WordPressMedia } from "@/types/wp-content-types"

export interface HeroSectionProps {
  post: WordPressPost
  media: WordPressMedia
}

export interface FeaturedPostProps {
  post: WordPressPost
  media?: WordPressMedia | null
} 