export function Newsletter() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Prenumerera på vårt nyhetsbrev</h2>
          <p className="text-gray-600 mb-6">Håll dig uppdaterad med de senaste nyheterna och händelserna från Bergvik.</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Din e-postadress"
              className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all hover:shadow-md"
            >
              Prenumerera
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 