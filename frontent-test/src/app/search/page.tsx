"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { PostCard } from "@/components/posts"
import Pagination from "@/components/Pagination"
import type { WordPressPost, WordPressMedia } from "@/types/wordpress"
import { stripHtml } from "@/utils/html"

// Sample data based on the provided JSON
const samplePosts: WordPressPost[] = [
  {
    id: 16328,
    date: "2025-05-12T14:32:53",
    slug: "swenstromskas-stenugnsbageri-till-bergvik",
    link: "https://bergvik.se/aktuellt/swenstromskas-stenugnsbageri-till-bergvik/",
    title: {
      rendered: "Swenströmskas Stenugnsbageri till Bergvik",
    },
    content: {
      rendered:
        "<p>Vi är superglada att kunna berätta att familjeföretaget Swenströmskas Stenugnsbageri öppnar hos oss på Bergvik!<br />\nSwenströmskas Stenugnsbageri är ett hantverksbageri som bakar med surdeg i stenugn. Verksamheten består av bageri, konditori och kallskänk och allt görs från grunden.</p>\n<p>Samma goda sortiment som finns på bageriet i stan kommer erbjudas på Bergvik. Stilen på inredningen kommer att vara det samma och framförallt så kommer de gulliga kopparna till kaffet också att följa med.</p>\n<p>&nbsp;</p>\n",
    },
    excerpt: {
      rendered:
        "<p>Vi är superglada att kunna berätta att familjeföretaget Swenströmskas Stenugnsbageri öppnar hos oss på Bergvik! Swenströmskas Stenugnsbageri är ett hantverksbageri som bakar med surdeg i stenugn. Verksamheten består av bageri, konditori och kallskänk och allt görs från grunden. Samma goda sortiment som finns på bageriet i stan kommer erbjudas på Bergvik. Stilen på inredningen kommer [&hellip;]</p>\n",
    },
    featured_media: 16329,
    categories: [1],
    author: 15,
  },
  // ... other posts (keeping them for reference but not showing all for brevity)
]

// Sample media data based on the provided JSON
const sampleMedia: Record<number, WordPressMedia> = {
  16329: {
    id: 16329,
    source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild.jpg",
    alt_text: "Stenugnsbageri",
    media_details: {
      width: 2048,
      height: 1363,
      sizes: {
        medium: {
          source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild-300x200.jpg",
          width: 300,
          height: 200,
        },
        large: {
          source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild-1024x682.jpg",
          width: 1024,
          height: 682,
        },
        thumbnail: {
          source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild-150x150.jpg",
          width: 150,
          height: 150,
        },
        full: {
          source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild.jpg",
          width: 2048,
          height: 1363,
        },
      },
    },
    title: {
      rendered: "Pressbild",
    },
  },
  // ... other media (keeping them for reference but not showing all for brevity)
}

// Sample comment counts
const sampleCommentCounts: Record<number, number> = {
  16328: 5,
  16091: 3,
  16071: 2,
  16068: 7,
  15942: 1,
  15793: 0,
  15684: 4,
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState<WordPressPost[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const postsPerPage = 6

  useEffect(() => {
    if (query) {
      // Simulate search delay
      setIsLoading(true)

      setTimeout(() => {
        const results = samplePosts.filter((post) => {
          const title = stripHtml(post.title.rendered).toLowerCase()
          const content = stripHtml(post.content.rendered).toLowerCase()
          const excerpt = stripHtml(post.excerpt.rendered).toLowerCase()
          const searchQuery = query.toLowerCase()

          return title.includes(searchQuery) || content.includes(searchQuery) || excerpt.includes(searchQuery)
        })

        setSearchResults(results)
        setCurrentPage(1)
        setIsLoading(false)
      }, 500)
    } else {
      setSearchResults([])
      setIsLoading(false)
    }
  }, [query])

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(searchResults.length / postsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Search Results</h1>
            <div className="relative">
              <form action="/search" method="get" className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    name="q"
                    defaultValue={query}
                    placeholder="Search articles..."
                    className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {query && (
              <p className="text-gray-600">
                {isLoading
                  ? "Searching..."
                  : searchResults.length > 0
                    ? `Found ${searchResults.length} results for "${query}"`
                    : `No results found for "${query}"`}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="aspect-[16/9] bg-gray-200"></div>
                  <div className="p-5">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {searchResults.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        media={sampleMedia[post.featured_media]}
                        commentCount={sampleCommentCounts[post.id] || 0}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                  )}
                </>
              ) : query ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No results match your search criteria.</p>
                  <p className="text-gray-500">Try using different keywords or check out our latest posts.</p>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
