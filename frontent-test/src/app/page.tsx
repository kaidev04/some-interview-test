import type { WordPressPost, WordPressMedia } from "@/types/wordpress"
import { PostsSection } from "@/components/posts"
import { FeaturedPost } from "@/components/sections"
import { Newsletter } from "@/components/common"
import { getPosts, getMedia } from '@/lib/wordpress'

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

  return (
    <div>
      {/* Featured Post */}
      <FeaturedPost post={featuredPost} media={mediaMap.get(featuredPost.id)} />

      {/* Posts Section */}
      <PostsSection
        posts={gridPosts}
        mediaMap={mediaMap}
        totalPosts={totalPosts}
      />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}
