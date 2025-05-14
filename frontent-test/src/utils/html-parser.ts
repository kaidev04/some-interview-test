import DOMPurify from "dompurify"

export const sanitizeHtml = (html: string): string => {
  if (typeof window === "undefined") {
    return html
  }
  return DOMPurify.sanitize(html)
}

export const stripHtml = (html: string): string => {
  if (typeof window === "undefined") {
    const tempDiv = { innerHTML: html }
    return tempDiv.innerHTML.replace(/<[^>]*>/g, "")
  }
  const doc = new DOMParser().parseFromString(html, "text/html")
  return doc.body.textContent || ""
}

export const estimateReadTime = (content: string): number => {
  const text = stripHtml(content)
  const wordsPerMinute = 200
  const numberOfWords = text.split(/\s/g).length
  return Math.ceil(numberOfWords / wordsPerMinute)
}
