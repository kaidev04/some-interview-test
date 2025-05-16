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
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {onAction && (
          <button
            onClick={onAction}
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all hover:shadow-md"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  )
} 