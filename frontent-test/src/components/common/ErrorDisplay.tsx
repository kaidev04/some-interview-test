"use client"

import { AlertCircle } from 'lucide-react'

interface ErrorDisplayProps {
  title?: string
  message?: string
  actionText?: string
  onAction?: () => void
}

export function ErrorDisplay({
  title = "Något gick fel!",
  message = "Vi stötte på ett fel när vi laddade inläggen. Vänligen försök igen.",
  actionText = "Försök igen",
  onAction
}: ErrorDisplayProps) {
  return (
    <div className="error-container">
      <div className="error-content">
        <AlertCircle className="error-icon" />
        <h2 className="error-title">{title}</h2>
        <p className="error-message">{message}</p>
        {onAction && (
          <button
            onClick={onAction}
            className="btn btn-primary btn-md"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  )
} 