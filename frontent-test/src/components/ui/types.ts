import type { ReactNode } from "react"
import type { WordPressMedia } from "@/types/wp-content-types"

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export interface FeaturedImageProps {
  media: WordPressMedia
  size?: "thumbnail" | "medium" | "large" | "full"
  className?: string
  priority?: boolean
  fill?: boolean
  withHoverEffect?: boolean
} 