import { FileQuestion } from 'lucide-react'
import { ErrorDisplay } from '../ErrorDisplay'

interface NotFoundErrorProps {
  title?: string
  message?: string
  linkText?: string
  linkHref?: string
}

export function NotFoundError({
  title = "404 - Sidan hittades inte",
  message = "Sidorna du letar efter finns inte eller har flyttats.",
  linkText = "Tillbaka till startsidan",
  linkHref = "/"
}: NotFoundErrorProps) {
  return (
    <ErrorDisplay
      title={title}
      message={message}
      action={{
        text: linkText,
        href: linkHref
      }}
      icon={<FileQuestion className="error-icon" />}
    />
  )
} 