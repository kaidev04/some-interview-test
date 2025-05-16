"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight, Clock, Phone, MapPin } from "lucide-react"
import type { FooterProps } from "./types"

export function Footer({}: FooterProps) {
  const [email, setEmail] = useState("")
  const currentYear = new Date().getFullYear()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    alert(`Thank you for subscribing with: ${email}`)
    setEmail("")
  }

  // Sample categories
  const categories = [
    { name: "Nyheter", slug: "nyheter" },
    { name: "Evenemang", slug: "evenemang" },
    { name: "Företag", slug: "foretag" },
    { name: "Kultur", slug: "kultur" },
    { name: "Livsstil", slug: "livsstil" },
    { name: "Mat", slug: "mat" },
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
              <span className="font-bold text-2xl text-white">Bergvik</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Bergvik är ett modernt köpcentrum med ett brett utbud av butiker, restauranger och serviceinrättningar. 
              Här hittar du allt under ett tak - mode, mat, elektronik och mycket mer. Välkommen till din 
              shoppingdestination i Karlstad!
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
              Snabblänkar
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-emerald-400 transition-colors inline-flex items-center group relative pl-0 hover:pl-6"
                >
                  <ArrowRight
                    size={14}
                    className="absolute left-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span className="transition-all duration-300">Hem</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/nyheter"
                  className="text-gray-300 hover:text-emerald-400 transition-colors inline-flex items-center group relative pl-0 hover:pl-6"
                >
                  <ArrowRight
                    size={14}
                    className="absolute left-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span className="transition-all duration-300">Nyheter</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/om-oss"
                  className="text-gray-300 hover:text-emerald-400 transition-colors inline-flex items-center group relative pl-0 hover:pl-6"
                >
                  <ArrowRight
                    size={14}
                    className="absolute left-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span className="transition-all duration-300">Om oss</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-gray-300 hover:text-emerald-400 transition-colors inline-flex items-center group relative pl-0 hover:pl-6"
                >
                  <ArrowRight
                    size={14}
                    className="absolute left-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span className="transition-all duration-300">Kontakt</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sök"
                  className="text-gray-300 hover:text-emerald-400 transition-colors inline-flex items-center group relative pl-0 hover:pl-6"
                >
                  <ArrowRight
                    size={14}
                    className="absolute left-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span className="transition-all duration-300">Sök</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block after:content-[''] after:block after:w-12 after:h-1 after:bg-emerald-500 after:mt-1">
              Kategorier
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-gray-300 hover:text-emerald-400 transition-colors inline-flex items-center group relative pl-0 hover:pl-6"
                  >
                    <ArrowRight
                      size={14}
                      className="absolute left-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    />
                    <span className="transition-all duration-300">{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block after:content-[''] after:block after:w-12 after:h-1 after:bg-emerald-500 after:mt-1">
              Kontakta oss
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 flex-shrink-0 text-emerald-400" />
                <span>Bergvik Center, Storgatan 45, 651 84 Karlstad</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 flex-shrink-0 text-emerald-400" />
                <a href="mailto:info@bergvik-news.se" className="hover:text-emerald-400 transition-colors">
                  info@bergvik-news.se
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 flex-shrink-0 text-emerald-400" />
                <a href="tel:+4654123456" className="hover:text-emerald-400 transition-colors">
                  +46 54 123 45 67
                </a>
              </li>
              <li className="flex items-center">
                <Clock size={18} className="mr-3 flex-shrink-0 text-emerald-400" />
                <span>Mån-Fre: 10-20, Lör-Sön: 10-18</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-12 pb-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Prenumerera på vårt nyhetsbrev</h3>
            <p className="text-gray-300 mb-6">
              Få de senaste nyheterna och händelserna direkt i din inkorg. Vi skickar aldrig spam!
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Din e-postadress"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
              >
                Prenumerera
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {currentYear} Bergvik News. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  )
} 