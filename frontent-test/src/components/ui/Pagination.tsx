"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import type { PaginationProps } from "./types"

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex justify-center items-center space-x-1 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
        aria-label="Föregående sida"
      >
        <ChevronLeft size={16} />
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`pagination-number ${
              currentPage === page ? "pagination-number-active" : ""
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
        aria-label="Nästa sida"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
} 