import type { WordPressPost, WordPressMedia } from "@/types/wordpress"

export interface HeroSectionProps {
  post: WordPressPost
  media: WordPressMedia
}

export interface FeaturedPostProps {
  post: WordPressPost
  media?: WordPressMedia | null
} 