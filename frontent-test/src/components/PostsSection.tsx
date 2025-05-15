"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { WordPressPost, WordPressMedia } from "@/types/wordpress"
import PostCard from "./PostCard"
import Pagination from "./Pagination"
import PostControls from "./PostControls"

interface PostsSectionProps {
  posts: WordPressPost[]
  mediaMap: Map<number, WordPressMedia | null>
  totalPosts: number
}

const POSTS_PER_PAGE = 9

export default function PostsSection({ posts: allPosts, mediaMap, totalPosts }: PostsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...allPosts]
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(post => {
        const title = post.title.rendered.toLowerCase()
        const excerpt = post.excerpt.rendered.toLowerCase()
        return title.includes(query) || excerpt.includes(query)
      })
    }
    
    // Sort posts
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })
    
    return result
  }, [allPosts, searchQuery, sortOrder])

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = filteredAndSortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setIsLoading(true)
    setCurrentPage(page)

    // Scroll to posts section
    const postsSection = document.getElementById('posts-section')
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth' })
    }

    // Simulate loading for smoother transition
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const handleSortChange = (order: 'newest' | 'oldest') => {
    setSortOrder(order)
    setCurrentPage(1) // Reset to first page when sorting changes
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset to first page when search changes
  }

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