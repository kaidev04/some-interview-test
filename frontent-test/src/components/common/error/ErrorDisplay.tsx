"use client"

import Link from "next/link"
import { AlertCircle } from 'lucide-react'

interface ErrorDisplayProps {
  title: string
  message: string
  action?: {
    text: string
    href?: string
    onClick?: () => void
  }
  icon?: React.ReactNode
}

export function ErrorDisplay({
  title,
  message,
  action,
  icon = <AlertCircle className="error-icon" />
}: ErrorDisplayProps) {
  return (
    <div className="error-container">
      <div className="error-content">
        {icon}
        <h2 className="error-title">{title}</h2>
        <p className="error-message">{message}</p>
        {action && (
          action.href ? (
            <Link
              href={action.href}
              className="btn btn-primary btn-md inline-block"
            >
              {action.text}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="btn btn-primary btn-md"
            >
              {action.text}
            </button>
          )
        )}
      </div>
    </div>
  )
} 