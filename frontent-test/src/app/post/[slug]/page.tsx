"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, MessageSquare, Share2, Facebook, Twitter, Linkedin, Calendar } from "lucide-react"
import type { WordPressPost, WordPressMedia } from "@/types/wordpress"
import { sanitizeHtml, stripHtml } from "@/utils/html"
import { use } from 'react'
import { getPost, getMedia } from '@/lib/wordpress'
import { formatDate } from '@/utils/html'

// Sample data based on the provided JSON
const samplePosts: WordPressPost[] = [
  {
    id: 16328,
    date: "2025-05-12T14:32:53",
    slug: "swenstromskas-stenugnsbageri-till-bergvik",
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
  },
  {
    id: 16091,
    date: "2025-04-04T15:24:49",
    slug: "premiar-arets-smakradstips",
    title: {
      rendered: "Premiär för årets Smakrådstips på Bergvik",
    },
    content: {
      rendered:
        '<p>Först ut är Ella, som i en ny film delar med sig av sina personliga favoriter och hjälper Ida Hallquist att bli redo för vårsäsongen – missa inte det!</p>\n<p><strong>Vill du ha ännu mer inspiration?</strong><br />\nUtforska hela smakteamet och ta del av trendspaningar, produktfavoriter och säsongens bästa idéer.</p>\n<p>👉 <a href="https://bergvik.se/smakradet/tips/beautyrutin/">Se filmen här</a><br />\n👉 <a href="https://bergvik.se/smakradet/">Upptäck årets smakprofiler och deras bästa tips</a></p>\n',
    },
    excerpt: {
      rendered:
        "<p>Först ut är Ella, som i en ny film delar med sig av sina personliga favoriter och hjälper Ida Hallquist att bli redo för vårsäsongen – missa inte det! Vill du ha ännu mer inspiration? Utforska hela smakteamet och ta del av trendspaningar, produktfavoriter och säsongens bästa idéer. 👉 Se filmen här 👉 Upptäck årets [&hellip;]</p>\n",
    },
    featured_media: 16093,
  },
  // Add more posts as needed
]

// Sample media data
const sampleMedia: Record<number, WordPressMedia> = {
  16329: {
    id: 16329,
    source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild.jpg",
    alt_text: "Stenugnsbageri",
    media_details: {
      sizes: {
        medium: {
          source_url: "https://bergvik.se/wp-content/uploads/2025/05/pressbild-300x200.jpg",
          width: 300,
          height: 200,
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
  16093: {
    id: 16093,
    source_url: "/placeholder.svg?height=800&width=1200",
    alt_text: "Smakrådstips",
    media_details: {
      sizes: {
        medium: {
          source_url: "/placeholder.svg?height=200&width=300",
          width: 300,
          height: 200,
        },
        full: {
          source_url: "/placeholder.svg?height=800&width=1200",
          width: 1200,
          height: 800,
        },
      },
    },
    title: {
      rendered: "Smakrådstips",
    },
  },
  // Add more media as needed
}

// Sample related posts
const sampleRelatedPosts: Record<number, WordPressPost[]> = {
  16328: [
    {
      id: 16091,
      date: "2025-04-04T15:24:49",
      slug: "premiar-arets-smakradstips",
      title: {
        rendered: "Premiär för årets Smakrådstips på Bergvik",
      },
      excerpt: {
        rendered: "<p>Först ut är Ella, som i en ny film delar med sig av sina personliga favoriter...</p>",
      },
      featured_media: 16093,
    },
    {
      id: 16071,
      date: "2025-04-03T15:22:51",
      slug: "vaccindirekt-oppnar-pa-bergvik",
      title: {
        rendered: "VaccinDirekt öppnar på Bergvik!",
      },
      excerpt: {
        rendered: "<p>11 april öppnar Vaccindirekt hos oss på Bergvik...</p>",
      },
      featured_media: 16073,
    },
  ],
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

function estimateReadTime(content: string): number {
  const text = stripHtml(content)
  const wordsPerMinute = 200
  const numberOfWords = text.split(/\s/g).length
  return Math.ceil(numberOfWords / wordsPerMinute)
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function PostPage({ params }: PageProps) {
  const { slug } = use(params)
  const post = use(getPost(slug))

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800">Post not found</h1>
        <Link
          href="/"
          className="inline-flex items-center mt-4 text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>
    )
  }

  const media = use(post.featured_media ? getMedia(post.featured_media) : Promise.resolve(null))
  const relatedPosts = sampleRelatedPosts[post.id] || []
  const commentCount = sampleCommentCounts[post.id] || 0
  const readTime = estimateReadTime(post.content.rendered)

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-gray-900">
        {media && (
          <Image
            src={media.source_url}
            alt={media.alt_text || post.title.rendered}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <Link
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title.rendered}
            </h1>
            <div className="flex items-center text-white/80">
              <Calendar size={20} className="mr-2" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-emerald-600 hover:prose-a:text-emerald-700"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      </div>
    </article>
  )
}
