import type { WordPressPost, WordPressMedia } from "@/types/wp-content-types"

export interface PostCardProps {
  post: WordPressPost
  media?: WordPressMedia | null
  commentCount?: number
  index?: number
}

export interface PostGridProps {
  posts: WordPressPost[]
  media: Record<number, WordPressMedia>
  initialPostsToShow?: number
  incrementAmount?: number
}

export interface PostControlsProps {
  onSortChange: (order: 'newest' | 'oldest') => void
  onSearch: (query: string) => void
  sortOrder: 'newest' | 'oldest'
}

export interface PostsSectionProps {
  posts: WordPressPost[]
  mediaMap: Map<number, WordPressMedia | null>
  totalPosts: number
}

export interface Author {
  name: string
  id: number
}

export interface PostContentProps {
  post: WordPressPost
  media?: WordPressMedia
  author?: Author
  relatedPosts?: Array<{
    post: WordPressPost
    media: WordPressMedia
  }>
} 