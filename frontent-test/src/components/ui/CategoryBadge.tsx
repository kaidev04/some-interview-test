import type { CategoryBadgeProps } from "./types"

const categoryColors: Record<number, string> = {
  1: "bg-emerald-100 text-emerald-800",
  2: "bg-blue-100 text-blue-800",
  3: "bg-amber-100 text-amber-800",
  4: "bg-rose-100 text-rose-800",
  5: "bg-violet-100 text-violet-800",
  // Add more category colors as needed
}

export function CategoryBadge({ category, size = "md" }: CategoryBadgeProps) {
  const colorClass = categoryColors[category.id] || "bg-gray-100 text-gray-800"

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${colorClass} ${sizeClasses[size]} transition-all`}
    >
      {category.name}
    </span>
  )
} 