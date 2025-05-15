"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, Menu, X, ChevronUp } from "lucide-react"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (searchOpen) setSearchOpen(false)
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (mobileMenuOpen) setMobileMenuOpen(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navLinks = [
    { name: "Hem", href: "/" },
    { name: "Om oss", href: "/om-oss" },
    { name: "Kontakt", href: "/kontakt" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header
        className={`bg-white shadow-sm py-4 sticky top-0 z-10 transition-all duration-300 ${
          isScrolled ? "shadow-md py-2" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="font-bold text-xl text-emerald-600 group-hover:text-emerald-700 transition-colors">
                Bergvik
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-gray-700 hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-600 after:transition-all after:duration-300 ${
                      pathname === link.href ? "text-emerald-600 after:w-full" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <button
                onClick={toggleSearch}
                className="text-gray-700 hover:text-emerald-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>

            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={toggleSearch}
                className="text-gray-700 hover:text-emerald-600 transition-colors p-2"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-emerald-600 transition-colors p-2"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 animate-slideDown">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium hover:text-emerald-600 transition-colors ${
                    pathname === link.href ? "text-emerald-600" : "text-gray-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Search overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-md animate-slideDown">
            <div className="container mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Sök inlägg..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600"
                  aria-label="Submit search"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      <Footer />

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-all hover:scale-110 animate-fadeIn z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  )
}
