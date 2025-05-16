"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { X, Search, ArrowRight } from "lucide-react"
import type { WordPressPost, WordPressMedia } from "../types/wordpress"
import FeaturedImage from "./FeaturedImage"
import { stripHtml } from "../utils/html-parser"
import { decodeHtml } from "../utils/html"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
  posts: WordPressPost[]
  media: Record<number, WordPressMedia>
}

export default function SearchOverlay({ isOpen, onClose, posts, media }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<WordPressPost[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      document.body.style.overflow = ""
      setSearchTerm("")
      setSearchResults([])
      setSelectedIndex(-1)
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      setSelectedIndex(-1)
      return
    }

    const term = searchTerm.toLowerCase()
    const results = posts
      .filter((post) => {
        const title = decodeHtml(stripHtml(post.title.rendered)).toLowerCase()
        const content = decodeHtml(stripHtml(post.content.rendered)).toLowerCase()
        return title.includes(term) || content.includes(term)
      })
      .slice(0, 5) // Limit to 5 results

    setSearchResults(results)
    setSelectedIndex(results.length > 0 ? 0 : -1)
  }, [searchTerm, posts])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      const selectedPost = searchResults[selectedIndex]
      if (selectedPost) {
        router.push(`/post/${selectedPost.slug}`)
        onClose()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 md:pt-32 animate-fadeIn">
      <div className="w-full max-w-4xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <Search size={20} className="text-gray-500 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Sök inlägg..."
            className="flex-grow text-lg focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {searchResults.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/post/${post.slug}`}
                  onClick={onClose}
                  className={`flex p-4 hover:bg-gray-50 transition-colors ${
                    index === selectedIndex ? "bg-emerald-50" : ""
                  }`}
                >
                  {media[post.featured_media] && (
                    <FeaturedImage
                      media={media[post.featured_media]}
                      size="thumbnail"
                      className="w-16 h-16 rounded-lg flex-shrink-0 mr-4"
                    />
                  )}
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800 mb-1">{decodeHtml(post.title.rendered)}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{decodeHtml(stripHtml(post.excerpt.rendered))}</p>
                  </div>
                  <div className="flex items-center ml-2">
                    <ArrowRight size={16} className="text-emerald-600" />
                  </div>
                </Link>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Inga resultat hittades för "{searchTerm}"</p>
              <p className="text-sm text-gray-400 mt-2">Prova andra sökord eller bläddra i våra kategorier</p>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">Börja skriva för att söka</p>
              <p className="text-sm text-gray-400 mt-2">Sök efter titel, innehåll eller nyckelord</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 text-sm text-gray-500 flex justify-between items-center">
          <div>
            <span className="font-medium">Tips:</span> Använd piltangenterna för att navigera och Enter för att välja
          </div>
          <div>
            <kbd className="px-2 py-1 bg-white rounded border border-gray-300 mr-1">↑</kbd>
            <kbd className="px-2 py-1 bg-white rounded border border-gray-300 mr-1">↓</kbd>
            <kbd className="px-3 py-1 bg-white rounded border border-gray-300">Enter</kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
