"use client"

import { formatDistanceToNow, format, parseISO } from "date-fns"

interface DateFormatterProps {
  dateString: string
  formatType?: "relative" | "full" | "short"
  className?: string
}

export default function DateFormatter({ dateString, formatType = "relative", className = "" }: DateFormatterProps) {
  const date = parseISO(dateString)

  let formattedDate = ""

  switch (formatType) {
    case "relative":
      formattedDate = formatDistanceToNow(date, { addSuffix: true })
      break
    case "full":
      formattedDate = format(date, "MMMM d, yyyy")
      break
    case "short":
      formattedDate = format(date, "MMM d, yyyy")
      break
    default:
      formattedDate = formatDistanceToNow(date, { addSuffix: true })
  }

  return (
    <time dateTime={dateString} className={className}>
      {formattedDate}
    </time>
  )
}
