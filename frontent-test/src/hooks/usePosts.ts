import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { WordPressPost } from "@/types/wp-content-types"

interface UsePostsOptions {
  initialPage?: number
  postsPerPage?: number
  initialSortOrder?: 'newest' | 'oldest'
}

export function usePosts(allPosts: WordPressPost[], options: UsePostsOptions = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const {
    initialPage = parseInt(searchParams.get('page') || '1', 10),
    postsPerPage = 9,
    initialSortOrder = 'newest'
  } = options
  
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>(initialSortOrder)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Update URL when page changes without scrolling
  useEffect(() => {
    const url = new URL(window.location.href)
    if (currentPage === 1) {
      url.searchParams.delete('page')
    } else {
      url.searchParams.set('page', currentPage.toString())
    }
    // Use replace instead of push to avoid adding to history stack
    router.replace(url.pathname + url.search, { scroll: false })
  }, [currentPage, router])

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
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredAndSortedPosts.slice(startIndex, startIndex + postsPerPage)

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

  return {
    currentPage,
    sortOrder,
    searchQuery,
    isLoading,
    filteredAndSortedPosts,
    paginatedPosts,
    totalPages,
    handlePageChange,
    handleSortChange,
    handleSearch,
    setIsLoading
  }
} 