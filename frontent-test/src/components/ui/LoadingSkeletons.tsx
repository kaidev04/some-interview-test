export function CardSkeleton() {
  return (
    <div className="card animate-fade">
      <div className="skeleton-image rounded-t-xl"></div>
      <div className="card-content stack-spacing">
        <div className="skeleton-text w-1/4"></div>
        <div className="skeleton-title w-3/4"></div>
        <div className="skeleton-text w-full"></div>
        <div className="skeleton-text w-2/3"></div>
        <div className="skeleton-text w-1/3"></div>
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 3 }) {
  return (
    <div className="grid-3-cols">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ContentSkeleton() {
  return (
    <div className="content-spacing animate-fade">
      <div className="skeleton-title w-3/4"></div>
      <div className="skeleton-text w-1/4"></div>
      <div className="skeleton-image h-64"></div>
      <div className="stack-spacing">
        <div className="skeleton-text w-full"></div>
        <div className="skeleton-text w-full"></div>
        <div className="skeleton-text w-5/6"></div>
        <div className="skeleton-text w-full"></div>
        <div className="skeleton-text w-4/6"></div>
      </div>
      <div className="skeleton-image h-20"></div>
      <div className="stack-spacing">
        <div className="skeleton-text w-full"></div>
        <div className="skeleton-text w-full"></div>
        <div className="skeleton-text w-3/4"></div>
      </div>
    </div>
  )
} 