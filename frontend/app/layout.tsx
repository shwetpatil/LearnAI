import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Chatbot',
  description: 'An AI-powered chatbot built with Next.js and Spring Boot',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        {children}
      </body>
    </html>
  )
}
