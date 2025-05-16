import type { ReactNode } from "react"
import type { WordPressPost, WordPressMedia } from "@/types/wp-content-types"

export interface LayoutProps {
  children: ReactNode
}

export interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
  posts: WordPressPost[]
  media: Record<number, WordPressMedia>
}

export interface FooterProps {
  // Currently no props needed, but can be extended later
} 