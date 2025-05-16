import type { ReactNode } from "react"
import type { WordPressMedia, Category } from "@/types/wordpress"

export interface CategoryBadgeProps {
  category: Category
  size?: "sm" | "md" | "lg"
}

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