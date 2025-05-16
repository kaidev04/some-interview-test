"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { sanitizeHtml } from "@/utils/html-parser"
import type { PostContentProps } from "./types"
import { PostHero } from "./PostHero"
import { ShareButtons } from "./ui/ShareButtons"
import { Newsletter } from "../common/Newsletter"

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
              className="inline-flex items-center text-gray-600 hover:text-emerald-600 mb-8 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Tillbaka
            </button>

            {/* Main content */}
            <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(post.content.rendered),
                }}
                className="post-content [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_p:has(img)]:flex [&_p:has(img)]:flex-wrap [&_p:has(img)]:gap-4 [&_p_img]:w-full [&_p_img]:md:max-w-[calc(50%-8px)] [&_p_img]:flex-1 [&_p:has(img)]:justify-center [&_img]:rounded-xl [&_img]:my-2 prose-img:my-2 [&_p]:mb-6 prose-headings:mb-2 prose-headings:mt-4 [&_br]:content-[''] [&_br]:leading-[0.5] [&_p:not(:has(img))]:block [&_strong]:inline-block [&_strong]:mb-1 [&_video]:w-full [&_video]:h-auto [&_video]:rounded-xl [&_video]:my-4 [&_.wp-video]:w-full [&_.wp-video]:max-w-full [&_.wp-video]:my-4 [&_.wp-video-shortcode]:w-full [&_.wp-video-shortcode]:h-auto"
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