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
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title text-4xl">{title}</h1>
        <p className="error-message text-lg">{message}</p>
        <Link
          href={linkHref}
          className="btn btn-primary btn-md inline-block"
        >
          {linkText}
        </Link>
      </div>
    </div>
  )
} 