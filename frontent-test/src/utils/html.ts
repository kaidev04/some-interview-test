export const sanitizeHtml = (html: string): string => {
  return html
}

export function stripHtml(html: string): string {
  // Server-safe HTML stripping
  return html.replace(/<[^>]*>/g, '')
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

const HTML_ENTITIES: { [key: string]: string } = {
  '&amp;': '&',
  '&#038;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#039;': "'",
  '&ndash;': '–',
  '&mdash;': '—',
  '&nbsp;': ' ',
}

export function decodeHtml(html: string): string {
  return html.replace(/&[#\w]+;/g, match => 
    HTML_ENTITIES[match] || match
  )
}
