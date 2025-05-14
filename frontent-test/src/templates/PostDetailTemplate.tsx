"use client"

import type React from "react"

import { useState } from "react"
import type { WordPressPost, WordPressMedia, Category, Author } from "../types/wordpress"
import PostContent from "../components/PostContent"
import { MessageSquare, Send } from "lucide-react"

interface PostDetailTemplateProps {
  post: WordPressPost
  media: WordPressMedia
  categories: Category[]
  author: Author
  relatedPosts: Array<{
    post: WordPressPost
    media: WordPressMedia
  }>
}

export default function PostDetailTemplate({ post, media, categories, author, relatedPosts }: PostDetailTemplateProps) {
  const [comment, setComment] = useState("")

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle comment submission logic here
    alert(`Comment submitted: ${comment}`)
    setComment("")
  }

  return (
    <div className="pb-16">
      {/* Post Content */}
      <PostContent post={post} media={media} categories={categories} author={author} relatedPosts={relatedPosts} />

      {/* Comments Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <MessageSquare size={24} className="text-emerald-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">Comments (3)</h3>
          </div>

          {/* Comment Form */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Leave a comment</h4>
            <form onSubmit={handleSubmitComment}>
              <div className="mb-4">
                <textarea
                  placeholder="Share your thoughts..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[120px]"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="saveInfo"
                  className="mr-2 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="saveInfo" className="text-gray-600">
                  Save my name and email for the next time I comment
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Post Comment
                <Send size={16} className="ml-2" />
              </button>
            </form>
          </div>

          {/* Sample Comments */}
          <div className="space-y-6">
            {/* Comment 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-4"></div>
                <div>
                  <div className="flex items-center mb-1">
                    <h5 className="font-medium text-gray-800 mr-3">John Doe</h5>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-600">
                    This is great news! I've been waiting for a good bakery to open at Bergvik. Looking forward to
                    trying their sourdough bread.
                  </p>
                </div>
              </div>
              <div className="ml-14">
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Reply</button>
              </div>
            </div>

            {/* Comment 2 with reply */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-4"></div>
                <div>
                  <div className="flex items-center mb-1">
                    <h5 className="font-medium text-gray-800 mr-3">Sarah Johnson</h5>
                    <span className="text-sm text-gray-500">3 days ago</span>
                  </div>
                  <p className="text-gray-600">
                    I've been to their location downtown and their pastries are amazing! So happy they're expanding to
                    Bergvik.
                  </p>
                </div>
              </div>
              <div className="ml-14 mb-4">
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Reply</button>
              </div>

              {/* Reply */}
              <div className="ml-14 pl-6 border-l-2 border-gray-100">
                <div className="flex items-start mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mr-3"></div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h5 className="font-medium text-gray-800 mr-3">Lisa Smith</h5>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-600">I agree! Their cinnamon rolls are to die for. Can't wait!</p>
                  </div>
                </div>
                <div className="ml-11">
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Reply</button>
                </div>
              </div>
            </div>

            {/* Comment 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-4"></div>
                <div>
                  <div className="flex items-center mb-1">
                    <h5 className="font-medium text-gray-800 mr-3">Michael Brown</h5>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-gray-600">
                    This is exactly what Bergvik needed! A proper bakery with quality products. Looking forward to the
                    opening day.
                  </p>
                </div>
              </div>
              <div className="ml-14">
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
