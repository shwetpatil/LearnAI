'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './components/ChatMessage'
import { ChatInput } from './components/ChatInput'
import { AuthForm } from './components/AuthForm'
import { apiClient } from './lib/api'
import { authAPI } from './lib/auth'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  fileUrl?: string
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user is authenticated on mount
    if (authAPI.isAuthenticated()) {
      setIsAuthenticated(true)
      setUser(authAPI.getUser())
    }
  }, [])

  const handleLogout = () => {
    authAPI.logout()
    setIsAuthenticated(false)
    setUser(null)
    setMessages([])
  }

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setUser(authAPI.getUser())
  }

  const handleSendMessage = async (content: string, file?: File) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)
    setError(null)

    try {
      // Prepare form data for file upload if present
      const formData = new FormData()
      formData.append('message', content)
      if (file) {
        formData.append('file', file)
      }

      // Send to backend
      const response = await apiClient.post('/api/chat', formData, {
        headers: file ? { 'Content-Type': 'multipart/form-data' } : {},
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
        fileUrl: response.data.fileUrl,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send message')
      console.error('Error sending message:', err)
    } finally {
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isAuthenticated) {
      scrollToBottom()
    }
  }, [messages, isAuthenticated])

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AuthForm onSuccess={handleAuthSuccess} />
  }

  return (
    <main className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Chatbot</h1>
          <p className="text-sm text-slate-400">Powered by OpenAI & Spring Boot</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-300">Welcome, {user?.username || user?.email}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome to AI Chatbot</h2>
            <p className="text-slate-400 max-w-md">
              Start a conversation, ask questions, or upload files for analysis.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading && (
              <div className="flex items-center space-x-2 text-slate-400">
                <div className="animate-spin h-4 w-4 border-2 border-slate-500 border-t-blue-500"></div>
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-6 mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </main>
  )
}
