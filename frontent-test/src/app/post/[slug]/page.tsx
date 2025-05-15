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

  console.log('Featured Media:', {
    postId: post.id,
    mediaId: post.featured_media,
    mediaContent: media,
    mediaSizes: media?.media_details?.sizes,
    sourceUrl: media?.source_url
  })

  // Get related posts (just get the latest posts excluding current one)
  const { posts: relatedPostsData } = await getPosts(1, 3)
  const filteredRelatedPosts = relatedPostsData.filter(p => p.id !== post.id).slice(0, 2)

  // Fetch media for related posts in parallel
  const relatedMediaPromises = filteredRelatedPosts.map(relatedPost => 
    relatedPost.featured_media ? getMedia(relatedPost.featured_media) : Promise.resolve(null)
  )
  const relatedMediaResponses = await Promise.all(relatedMediaPromises)

  const relatedPosts = filteredRelatedPosts.map((relatedPost, index) => ({
    post: relatedPost,
    media: relatedMediaResponses[index] || undefined
  }))

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
