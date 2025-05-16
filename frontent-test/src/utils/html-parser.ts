import sanitizeHtmlLib from 'sanitize-html'
import type { IOptions } from 'sanitize-html'

function transformImageUrl(url: string): string {
  // Handle undefined or null URLs
  if (!url) {
    return '';
  }

  // Check if it's a Webien optimized URL
  if (url.includes('wrooom.webien.io')) {
    // Parse the base64 JSON configuration
    try {
      const base64Config = url.split('/').pop() || ''
      const config = JSON.parse(atob(base64Config))
      
      // Get the original image URL
      const originalUrl = config.imageUrl
      
      // Create a new high-quality config
      const newConfig = {
        imageUrl: originalUrl,
        publicKey: "noKey",
        edits: {
          webp: {
            quality: 90
          },
          resize: {
            width: 1200,
            height: 1200,
            fit: "inside",
            withoutEnlargement: true,
            position: "attention"
          },
          toFormat: "webp"
        }
      }
      
      // Return new optimized URL
      return `https://wrooom.webien.io/${btoa(JSON.stringify(newConfig))}`
    } catch (e) {
      console.error('Error transforming image URL:', e)
      return url
    }
  }
  
  return url
}

export const sanitizeHtml = (html: string): string => {
  const options: IOptions = {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
      'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe',
      'img', 'figure', 'figcaption', 'video', 'audio', 'source', 'span'
    ],
    allowedAttributes: {
      ...sanitizeHtmlLib.defaults.allowedAttributes,
      '*': ['class', 'id', 'style'],
      'img': ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding', 'class'],
      'source': ['src', 'type'],
      'video': ['src', 'controls', 'width', 'height', 'poster', 'preload', 'autoplay', 'muted', 'loop', 'playsinline', 'class'],
      'audio': ['src', 'controls', 'preload', 'autoplay', 'muted', 'loop', 'class'],
      'iframe': ['src', 'width', 'height', 'frameborder', 'allowfullscreen', 'allow', 'class']
    },
    transformTags: {
      'img': (tagName, attribs) => {
        // Skip images without src or with pixel.webp
        if (!attribs.src || attribs.src.includes('pixel.webp')) {
          return {
            tagName: '',
            attribs: {}
          };
        }
        
        return {
          tagName,
          attribs: {
            ...attribs,
            src: transformImageUrl(attribs.src),
            loading: 'lazy',
            decoding: 'async',
            class: 'rounded-lg w-full h-auto'
          }
        }
      },
      'webien-image': (tagName, attribs) => {
        // Transform webien-image to regular img with optimized source
        const mainImg = attribs['data-srcset'] ? 
          transformImageUrl(attribs['data-srcset'].split(' ')[0]) : 
          transformImageUrl(attribs['src'])
        
        return {
          tagName: 'img',
          attribs: {
            src: mainImg,
            alt: attribs.alt || '',
            title: attribs.title || '',
            width: attribs.width || '',
            height: attribs.height || '',
            loading: 'lazy',
            decoding: 'async',
            class: 'rounded-lg w-full h-auto'
          }
        }
      },
      'video': (tagName, attribs) => {
        // Ensure videos have controls by default
        return {
          tagName,
          attribs: {
            ...attribs,
            controls: 'controls',
            class: 'rounded-xl w-full h-auto my-4'
          }
        }
      }
    }
  }
  
  return sanitizeHtmlLib(html, options)
}

export function stripHtml(html: string): string {
  // Server-safe HTML stripping
  return html.replace(/<[^>]*>/g, '')
}

export function estimateReadTime(content: string): number {
  const words = stripHtml(content).split(/\s+/).length
  const wordsPerMinute = 200
  return Math.ceil(words / wordsPerMinute)
}
