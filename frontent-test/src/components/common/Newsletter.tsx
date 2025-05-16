interface NewsletterProps {
  className?: string
  containerClassName?: string
  variant?: 'default' | 'sidebar'
}

export function Newsletter({ className = "bg-gray-100 py-12", containerClassName = "container mx-auto px-4", variant = 'default' }: NewsletterProps) {
  const isSidebar = variant === 'sidebar'

  const wrapperClasses = isSidebar 
    ? "sticky top-28" 
    : className

  const containerClasses = isSidebar
    ? "bg-emerald-50 rounded-xl p-6"
    : containerClassName

  const titleClasses = isSidebar
    ? "text-xl font-bold text-gray-800 mb-2"
    : "text-2xl font-bold text-gray-800 mb-4"

  const formClasses = isSidebar
    ? "space-y-3"
    : "flex flex-col sm:flex-row gap-3"

  const inputClasses = isSidebar
    ? "w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
    : "flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"

  const buttonClasses = isSidebar
    ? "w-full bg-emerald-600 text-white font-medium py-3 rounded-xl hover:bg-emerald-700 transition-colors"
    : "px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all hover:shadow-md"

  return (
    <div className={wrapperClasses}>
      <div className={containerClasses}>
        <div className={isSidebar ? undefined : "max-w-xl mx-auto text-center"}>
          <h3 className={titleClasses}>Prenumerera på vårt nyhetsbrev</h3>
          <p className={isSidebar ? "text-gray-600 mb-4" : "text-gray-600 mb-6"}>
            Håll dig uppdaterad med de senaste nyheterna och händelserna från Bergvik.
          </p>
          <form className={formClasses}>
            <input
              type="email"
              placeholder="Din e-postadress"
              className={inputClasses}
              required
              aria-label="Email address"
            />
            <button
              type="submit"
              className={buttonClasses}
            >
              Prenumerera
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 