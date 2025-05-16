import Link from "next/link"

interface NotFoundDisplayProps {
  title?: string
  message?: string
  linkText?: string
  linkHref?: string
}

export function NotFoundDisplay({
  title = "404 - Sidan hittades inte",
  message = "Sidorna du letar efter finns inte eller har flyttats.",
  linkText = "Tillbaka till startsidan",
  linkHref = "/"
}: NotFoundDisplayProps) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600 mb-8">{message}</p>
      <Link
        href={linkHref}
        className="inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
      >
        {linkText}
      </Link>
    </div>
  )
} 