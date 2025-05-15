"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { WordPressPost, WordPressMedia } from "@/types/wordpress"
import PostCard from "./PostCard"
import Pagination from "./Pagination"
import { getPosts, getMedia } from '@/lib/wordpress'

interface PostsSectionProps {
  posts: WordPressPost[]
  mediaMap: Map<number, WordPressMedia | null>
  totalPages: number
}

export default function PostsSection({ posts: initialPosts, mediaMap: initialMediaMap, totalPages }: PostsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState(initialPosts)
  const [mediaMap, setMediaMap] = useState(initialMediaMap)
  const [isLoading, setIsLoading] = useState(false)

  const handlePageChange = async (page: number) => {
    setIsLoading(true)
    setCurrentPage(page)

    try {
      const { posts: newPosts } = await getPosts(page, 9)
      
      // Fetch media for new posts
      const mediaPromises = newPosts.map(post => 
        post.featured_media ? getMedia(post.featured_media) : Promise.resolve(null)
      )
      const mediaResults = await Promise.all(mediaPromises)
      const newMediaMap = new Map(
        mediaResults.map((media, index) => [newPosts[index].id, media])
      )

      setPosts(newPosts)
      
      // Create a new map by combining both maps
      const combinedMap = new Map()
      Array.from(mediaMap.entries()).forEach(([key, value]) => combinedMap.set(key, value))
      Array.from(newMediaMap.entries()).forEach(([key, value]) => combinedMap.set(key, value))
      setMediaMap(combinedMap)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }

    // Scroll to posts section
    const postsSection = document.getElementById('posts-section')
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="py-12" id="posts-section">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="animate-slideUp"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <PostCard post={post} media={mediaMap.get(post.id)} />
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="mt-8">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  )
} 