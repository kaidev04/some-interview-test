export function FeaturedPostSkeleton() {
  return (
    <div className="bg-emerald-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="h-8 w-32 bg-emerald-200 rounded-full animate-pulse mb-4"></div>
              <div className="h-12 w-3/4 bg-gray-300 rounded animate-pulse mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="mt-6">
                <div className="h-10 w-36 bg-emerald-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[350px] rounded-lg bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 