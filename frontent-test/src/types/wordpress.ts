export interface WordPressPost {
  id: number
  date: string
  slug: string
  link?: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  featured_media: number
  categories?: number[]
  author?: number
  _links?: {
    'wp:featuredmedia'?: Array<{
      href: string
    }>
  }
}

export interface WordPressMedia {
  id: number
  source_url: string
  alt_text: string
  media_details?: {
    width: number
    height: number
    sizes: {
      [key: string]: {
        source_url: string
        width: number
        height: number
      }
    }
  }
  title?: {
    rendered: string
  }
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
}
