export function NewsletterSkeleton() {
  return (
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
  )
} 