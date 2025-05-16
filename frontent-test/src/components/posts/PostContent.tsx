"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { sanitizeHtml } from "@/utils/html-parser"
import type { PostContentProps } from "./types"
import { PostHero } from "./PostHero"
import { ShareButtons } from "./ui/ShareButtons"
import { Newsletter } from "../common/newsletter"

export function PostContent({ post, media, author }: PostContentProps) {
  const router = useRouter()

  return (
    <article className="bg-white -mt-[64px]">
      <PostHero post={post} media={media} author={author} />

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            {/* Back to previous page link */}
            <button
              onClick={() => router.back()}
              className="btn btn-icon text-gray-600 hover:text-emerald-600 mb-8"
            >
              <ArrowLeft size={18} className="mr-2" />
              Tillbaka
            </button>

            {/* Main content */}
            <div className="post-content-wrapper">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(post.content.rendered),
                }}
                className="post-content"
              />
            </div>

            <ShareButtons />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Newsletter variant="sidebar" />
          </div>
        </div>
      </div>
    </article>
  )
} 