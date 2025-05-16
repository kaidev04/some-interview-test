import { Share2, Facebook, Twitter, Linkedin } from "lucide-react"

export function ShareButtons() {
  return (
    <div className="mt-12 pt-6 border-t border-gray-200">
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-medium text-gray-700 flex items-center">
          <Share2 size={18} className="mr-2" />
          Share this article:
        </span>

        <div className="flex gap-2">
          <button
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Share on Facebook"
          >
            <Facebook size={18} />
          </button>
          <button
            className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
            aria-label="Share on Twitter"
          >
            <Twitter size={18} />
          </button>
          <button
            className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Linkedin size={18} />
          </button>
        </div>
      </div>
    </div>
  )
} 