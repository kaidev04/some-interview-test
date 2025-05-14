export const sanitizeHtml = (html: string): string => {
  return html
}

export const stripHtml = (html: string): string => {
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, "")
  }
  const doc = new DOMParser().parseFromString(html, "text/html")
  return doc.body.textContent || ""
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}
