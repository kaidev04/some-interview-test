export interface WordPressPost {
  id: number
  date: string
  slug: string
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
}

export interface WordPressMedia {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    sizes: {
      [key: string]: {
        source_url: string
        width: number
        height: number
      }
    }
  }
  title: {
    rendered: string
  }
}
