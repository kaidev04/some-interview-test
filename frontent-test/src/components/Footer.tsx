"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight, Clock, Phone, MapPin } from "lucide-react"

export default function Footer() {
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
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                  Hem
                </Link>
              </li>
              <li>
                <Link
                  href="/nyheter"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                  Nyheter
                </Link>
              </li>
              <li>
                <Link
                  href="/om-oss"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                  Om oss
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/sök"
                  className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  />
                  Sök
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
                <span>Måndag-Fredag: 9:00-17:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer with legal links and copyright */}
      <div className="border-t border-gray-700 mt-8 pt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; Bergvik {currentYear}
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/integritetspolicy" className="text-gray-400 hover:text-white transition-colors">
                Integritetspolicy
              </Link>
              <Link href="/anvandningsvillkor" className="text-gray-400 hover:text-white transition-colors">
                Användningsvillkor
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/tillganglighet" className="text-gray-400 hover:text-white transition-colors">
                Tillgänglighet
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
