"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, Menu, X, ChevronUp } from "lucide-react"
import { Footer } from "./Footer"
import { SearchOverlay } from "./SearchOverlay"
import type { WordPressPost, WordPressMedia } from "@/types/wp-content-types"
import { getPosts, getMedia } from "@/lib/wp-api-client"
import type { LayoutProps } from "./types"

// Create a cache outside the component to persist between re-renders
let postsCache: WordPressPost[] | null = null
let mediaCache: Record<number, WordPressMedia> | null = null

export function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [posts, setPosts] = useState<WordPressPost[]>(postsCache || [])
  const [media, setMedia] = useState<Record<number, WordPressMedia>>(mediaCache || {})
  const [isLoading, setIsLoading] = useState(!postsCache)
  const pathname = usePathname()

  const fetchData = useCallback(async () => {
    if (postsCache && mediaCache) {
      return
    }

    try {
      setIsLoading(true)
      // Fetch all posts
      const { posts: fetchedPosts } = await getPosts()
      
      // Create a Set of unique media IDs to fetch
      const mediaIds = new Set(
        fetchedPosts
          .filter(post => post.featured_media)
          .map(post => post.featured_media)
      )

      // Fetch media for unique IDs
      const mediaPromises = Array.from(mediaIds).map(mediaId => getMedia(mediaId))
      const mediaResults = await Promise.all(mediaPromises)

      // Create a map of media ID to media object
      const mediaMap = mediaResults.reduce((acc, media, index) => {
        if (media) {
          acc[Array.from(mediaIds)[index]] = media
        }
        return acc
      }, {} as Record<number, WordPressMedia>)

      // Update state and cache
      setPosts(fetchedPosts)
      setMedia(mediaMap)
      postsCache = fetchedPosts
      mediaCache = mediaMap
    } catch (error) {
      console.error("Error fetching posts and media:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close search overlay when navigating
  useEffect(() => {
    setSearchOpen(false)
  }, [pathname])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (searchOpen) setSearchOpen(false)
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (mobileMenuOpen) setMobileMenuOpen(false)
  }

  const navLinks = [
    { name: "Hem", href: "/" },
    { name: "Om oss", href: "/om-oss" },
    { name: "Kontakt", href: "/kontakt" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header
        className={`bg-white shadow-sm py-4 sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-md py-2" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="font-bold text-xl text-emerald-600 group-hover:text-emerald-700 transition-colors">
                Bergvik
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-gray-700 hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-600 after:transition-all after:duration-300 ${
                      pathname === link.href ? "text-emerald-600 after:w-full" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <button
                onClick={toggleSearch}
                disabled={isLoading}
                className={`text-gray-700 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-gray-100 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>

            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={toggleSearch}
                disabled={isLoading}
                className={`text-gray-700 hover:text-emerald-600 transition-colors p-2 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-emerald-600 transition-colors p-2"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 animate-slideDown">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium hover:text-emerald-600 transition-colors ${
                    pathname === link.href ? "text-emerald-600" : "text-gray-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Search overlay */}
        <SearchOverlay
          isOpen={searchOpen && !isLoading}
          onClose={() => setSearchOpen(false)}
          posts={posts}
          media={media}
        />
      </header>

      <main className="flex-grow">{children}</main>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors z-20 animate-fadeIn"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      <Footer />
    </div>
  )
} 