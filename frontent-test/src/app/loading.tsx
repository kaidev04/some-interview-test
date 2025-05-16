import { FeaturedPostSkeleton } from "@/components/sections"
import { NewsletterSkeleton } from "@/components/common"
import { GridSkeleton } from "@/components/ui"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Post Skeleton */}
      <FeaturedPostSkeleton />

      {/* Post Grid Skeleton */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="h-8 w-48 bg-gray-300 rounded animate-pulse mx-auto mb-8"></div>
          <GridSkeleton count={6} />
        </div>
      </div>

      {/* Newsletter Skeleton */}
      <NewsletterSkeleton />
    </div>
  );
} 