"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PostCard } from "./ui/PostCard"
import Pagination from "../Pagination"
import { PostControls } from "./ui/PostControls"
import { usePosts } from "@/hooks/usePosts"
import type { PostsSectionProps } from "./types"

const POSTS_PER_PAGE = 9

export function PostsSection({ posts: allPosts, mediaMap, totalPosts }: PostsSectionProps) {
  const {
    currentPage,
    sortOrder,
    isLoading,
    paginatedPosts,
    filteredAndSortedPosts,
    totalPages,
    handlePageChange,
    handleSortChange,
    handleSearch
  } = usePosts(allPosts, { 
    postsPerPage: POSTS_PER_PAGE 
  })

  return (
    <div className="py-12" id="posts-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 inline-block relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-emerald-500 after:rounded-full">
            Aktuellt
          </h2>
        </div>
        
        <PostControls
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onSearch={handleSearch}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post, index) => (
            <div
              key={`${post.id}-${index}`}
              className="animate-slideUp"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <PostCard post={post} media={mediaMap.get(post.id)} />
            </div>
          ))}
        </div>

        {filteredAndSortedPosts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Inga inlägg hittades som matchar dina sökningar.</p>
          </div>
        )}

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