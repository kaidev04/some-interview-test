import type { WordPressPost, WordPressMedia } from "@/types/wp-content-types"

export interface FeaturedPostProps {
  post: WordPressPost
  media?: WordPressMedia | null
} 