import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageSquare, Calendar } from "lucide-react"
import { formatDate, stripHtml, decodeHtml } from "@/utils/html"
import type { PostCardProps } from "../types"

export function PostCard({ post, media, commentCount = 0, categories, index }: PostCardProps) {
  const imageUrl = media?.source_url || "/placeholder.jpg"
  const excerpt = stripHtml(post.excerpt.rendered)
  const title = decodeHtml(post.title.rendered)

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
      <Link href={`/post/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imageUrl}
            alt={media?.alt_text || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-2" />
              <span>{formatDate(post.date)}</span>
            </div>
            {commentCount > 0 && (
              <div className="flex items-center text-sm text-gray-500">
                <MessageSquare size={16} className="mr-1" />
                <span>{commentCount}</span>
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-600 text-sm font-normal leading-relaxed mb-4 line-clamp-3 italic">{excerpt}</p>
          <div className="inline-flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
            Läs mer
            <ArrowRight
              size={16}
              className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </div>
  )
} 