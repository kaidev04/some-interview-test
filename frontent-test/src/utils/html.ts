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
  return date.toLocaleDateString("sv-SE", options)
}

const HTML_ENTITIES: { [key: string]: string } = {
  // Basic HTML entities
  '&amp;': '&',
  '&#038;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#034;': '"',
  '&apos;': "'",
  '&#039;': "'",
  
  // Typography
  '&ndash;': '–',
  '&#8211;': '–',
  '&mdash;': '—',
  '&#8212;': '—',
  '&lsquo;': '\u2018',
  '&#8216;': '\u2018',
  '&rsquo;': '\u2019',
  '&#8217;': '\u2019',
  '&ldquo;': '\u201C',
  '&#8220;': '\u201C',
  '&rdquo;': '\u201D',
  '&#8221;': '\u201D',
  '&bull;': '•',
  '&#8226;': '•',
  '&hellip;': '…',
  '&#8230;': '…',
  
  // Spacing
  '&nbsp;': ' ',
  '&#160;': ' ',
  '&ensp;': ' ',
  '&#8194;': ' ',
  '&emsp;': ' ',
  '&#8195;': ' ',
  
  // Currency
  '&euro;': '€',
  '&#8364;': '€',
  '&pound;': '£',
  '&#163;': '£',
  '&cent;': '¢',
  '&#162;': '¢',
  
  // Swedish characters
  '&aring;': 'å',
  '&#229;': 'å',
  '&Aring;': 'Å',
  '&#197;': 'Å',
  '&auml;': 'ä',
  '&#228;': 'ä',
  '&Auml;': 'Ä',
  '&#196;': 'Ä',
  '&ouml;': 'ö',
  '&#246;': 'ö',
  '&Ouml;': 'Ö',
  '&#214;': 'Ö'
}

export function decodeHtml(html: string): string {
  if (!html) return ''
  
  let decoded = html

  // Replace named and numeric HTML entities
  decoded = decoded.replace(/&[#\w]+;/g, match => {
    // Check for direct match in our entities map
    if (HTML_ENTITIES[match]) {
      return HTML_ENTITIES[match]
    }
    
    // Handle numeric entities not in our map
    if (match.startsWith('&#')) {
      const numeric = match.match(/&#(\d+);/)
      if (numeric) {
        try {
          return String.fromCharCode(parseInt(numeric[1], 10))
        } catch (e) {
          return match
        }
      }
    }
    
    return match
  })

  return decoded
}
