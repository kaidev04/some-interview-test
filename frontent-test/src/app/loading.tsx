export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Post Skeleton */}
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

      {/* Post Grid Skeleton */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="h-8 w-48 bg-gray-300 rounded animate-pulse mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-300 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-emerald-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Skeleton */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="h-8 w-64 bg-gray-300 rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow h-12 bg-white rounded-lg animate-pulse"></div>
              <div className="h-12 w-32 bg-emerald-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 