interface NewsletterProps {
  variant?: 'default' | 'sidebar'
}

export function Newsletter({ variant = 'default' }: NewsletterProps) {
  const isSidebar = variant === 'sidebar'

  return (
    <div className={`${isSidebar ? 'sticky top-28' : 'section-spacing bg-gray-100'}`}>
      <div className={isSidebar ? 'bg-emerald-50 rounded-xl p-6' : 'container-narrow'}>
        <div className={isSidebar ? undefined : "text-center"}>
          <h3 className={`${isSidebar ? 'text-xl' : 'text-2xl'} font-bold text-gray-800 mb-4`}>
            Prenumerera på vårt nyhetsbrev
          </h3>
          <p className="text-gray-600 mb-4">
            Håll dig uppdaterad med de senaste nyheterna och händelserna från Bergvik.
          </p>
          <form className={`form-group ${!isSidebar && 'sm:flex-row sm:items-start'}`}>
            <input
              type="email"
              placeholder="Din e-postadress"
              className="form-input"
              required
              aria-label="Email address"
            />
            <button
              type="submit"
              className={`btn btn-primary ${isSidebar ? 'btn-full' : ''} btn-md`}
            >
              Prenumerera
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 