"use client"

import { useState } from "react"
import { PostCard } from "./ui/PostCard"
import { GridSkeleton } from "../ui/LoadingSkeletons"
import type { PostGridProps } from "./types"

export function PostGrid({
  posts,
  media,
  categories,
  initialPostsToShow = 9,
  incrementAmount = 3,
}: PostGridProps) {
  const [postsToShow, setPostsToShow] = useState(initialPostsToShow)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = () => {
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      setPostsToShow((prev) => prev + incrementAmount)
      setIsLoading(false)
    }, 800)
  }

  const visiblePosts = posts.slice(0, postsToShow)
  const hasMorePosts = postsToShow < posts.length

  // Get categories for each post
  const getPostCategories = (post: any) => {
    return categories.filter((cat) => (post.categories ?? []).includes(cat.id))
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Inga inlägg hittade</h3>
        <p className="text-gray-500">Kolla tillbaka senare för nytt innehåll.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {visiblePosts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            media={media[post.featured_media]}
            categories={getPostCategories(post)}
            index={index}
          />
        ))}
      </div>

      {isLoading && <GridSkeleton count={incrementAmount} />}

      {hasMorePosts && !isLoading && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-white border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
          >
            Ladda fler
          </button>
        </div>
      )}
    </div>
  )
} 