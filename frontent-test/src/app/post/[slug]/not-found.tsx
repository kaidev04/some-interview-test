import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Post not found</h1>
        <p className="text-gray-600 mb-8">The post you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
} 