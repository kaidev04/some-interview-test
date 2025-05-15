"use client"

import { Search, ChevronDown, ChevronUp } from "lucide-react"

interface PostControlsProps {
  onSortChange: (order: 'newest' | 'oldest') => void
  onSearch: (query: string) => void
  sortOrder: 'newest' | 'oldest'
}

export default function PostControls({ onSortChange, onSearch, sortOrder }: PostControlsProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Sort by:</span>
        <div className="flex gap-2">
          <button
            onClick={() => onSortChange('newest')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
              sortOrder === 'newest'
                ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Newest
            <ChevronDown size={16} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => onSortChange('oldest')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
              sortOrder === 'oldest'
                ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Oldest
            <ChevronUp size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full md:w-[300px] pl-11 pr-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
    </div>
  )
} 