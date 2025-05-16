import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { WordPressPost, WordPressMedia } from "@/types/wordpress"
import { getPost, getMedia, getPosts } from '@/lib/wordpress'
import PostContent from '@/components/PostContent'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  // Fetch media if it exists
  const media = post.featured_media ? 
    await getMedia(post.featured_media) || undefined : 
    undefined

  // Get author from _embedded data if available
  const author = post._embedded?.author?.[0] ? {
    name: post._embedded.author[0].name,
    id: post._embedded.author[0].id
  } : undefined

  return (
    <PostContent
      post={post}
      media={media}
      author={author}
    />
  )
}
