import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { WordPressPost, WordPressMedia } from "@/types/wordpress"
import PostsSection from "@/components/PostsSection"
import { getPosts, getMedia } from '@/lib/wordpress'
import { formatDate, decodeHtml } from '@/utils/html'

export default async function Home() {
  // Get all posts at once by not specifying perPage
  const { posts, totalPosts } = await getPosts()
  
  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800">Inga inlägg hittades</h1>
      </div>
    )
  }

  // Get the first post for the featured section
  const featuredPost = posts[0]
  // All posts for the grid
  const gridPosts = posts

  // Fetch media for each post
  const mediaPromises = posts.map(post => 
    post.featured_media ? getMedia(post.featured_media) : Promise.resolve(null)
  )
  const mediaResults = await Promise.all(mediaPromises)
  const mediaMap = new Map(
    mediaResults.map((media, index) => [posts[index].id, media])
  )

  const featuredTitle = decodeHtml(featuredPost.title.rendered)

  return (
    <div>
      {/* Featured Post */}
      <div className="bg-emerald-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="animate-fadeIn">
                <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full hover:bg-emerald-200 transition-colors">
                  Utvalt inlägg
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {featuredTitle}
                </h1>
                <div
                  className="text-gray-600 mb-6 text-base italic font-light"
                  dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }}
                />
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span>{formatDate(featuredPost.date)}</span>
                </div>
                <Link
                  href={`/post/${featuredPost.slug}`}
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all hover:shadow-md group"
                >
                  Läs Mer
                  <ArrowRight
                    size={18}
                    className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
              <div className="relative h-[300px] md:h-[350px] rounded-xl overflow-hidden shadow-lg animate-slideUp">
                <Image
                  src={mediaMap.get(featuredPost.id)?.source_url || '/placeholder.jpg'}
                  alt={featuredTitle}
                  fill
                  className="object-cover transition-all duration-300"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <PostsSection
        posts={gridPosts}
        mediaMap={mediaMap}
        totalPosts={totalPosts}
      />

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Prenumerera på Vårt Nyhetsbrev</h2>
            <p className="text-gray-600 mb-6">Håll dig uppdaterad med de senaste nyheterna och händelserna från Bergvik.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Din e-postadress"
                className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all hover:shadow-md"
              >
                Prenumerera
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
