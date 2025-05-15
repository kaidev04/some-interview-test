"use client"

import { useState } from "react"
import type { WordPressPost, WordPressMedia, Category } from "../types/wordpress"
import HeroSection from "../components/HeroSection"
import PostGrid from "../components/PostGrid"
import { Mail } from "lucide-react"

interface HomePageTemplateProps {
  posts: WordPressPost[]
  media: Record<number, WordPressMedia>
  categories: Category[]
}

export default function HomePageTemplate({ posts, media, categories }: HomePageTemplateProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  // Get the first post for the hero section
  const heroPost = posts[0]
  const heroMedia = media[heroPost.featured_media]

  // Filter remaining posts based on active category
  const filteredPosts = posts
    .slice(1)
    .filter((post) => activeCategory === null || post.categories.includes(activeCategory))

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <HeroSection post={heroPost} media={heroMedia} />

      {/* Category Filter */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === null ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Post Grid */}
        <PostGrid posts={filteredPosts} media={media} categories={categories} />
      </section>

      {/* Newsletter Section */}
      <section className="bg-emerald-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
              <Mail size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Håll dig uppdaterad med Bergvik</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Subscribe to our newsletter and never miss the latest news, updates, and special offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-500 mt-4 text-sm">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
