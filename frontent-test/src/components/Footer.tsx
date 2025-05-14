"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const currentYear = new Date().getFullYear()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    alert(`Thank you for subscribing with: ${email}`)
    setEmail("")
  }

  // Sample categories - replace with actual categories from your data
  const categories = [
    { name: "News", slug: "news" },
    { name: "Events", slug: "events" },
    { name: "Business", slug: "business" },
    { name: "Culture", slug: "culture" },
    { name: "Lifestyle", slug: "lifestyle" },
    { name: "Food", slug: "food" },
  ]

  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      {/* Main footer content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and about section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="font-bold text-2xl text-white">Bergvik News</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted source for local news, events, and stories that matter to the Bergvik community. Delivering
              timely and relevant information since 2020.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block after:content-[''] after:block after:w-12 after:h-1 after:bg-emerald-500 after:mt-1">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block after:content-[''] after:block after:w-12 after:h-1 after:bg-emerald-500 after:mt-1">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group"
                  >
                    <ArrowRight
                      size={14}
                      className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                    />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block after:content-[''] after:block after:w-12 after:h-1 after:bg-emerald-500 after:mt-1">
              Newsletter
            </h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest updates and news.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center group"
              >
                Subscribe
                <ArrowRight
                  size={16}
                  className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom footer with legal links and copyright */}
      <div className="border-t border-gray-700 mt-8 pt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Bergvik News. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="text-gray-400 hover:text-white transition-colors">
                Terms of Use
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='1' fillRule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
    </footer>
  )
}
