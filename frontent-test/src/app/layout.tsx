import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Layout from "../components/Layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bergvik News",
  description: "Latest news and updates from Bergvik",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
