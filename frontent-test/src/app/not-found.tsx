import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">The page you are looking for does not exist or has been moved.</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  )
}
