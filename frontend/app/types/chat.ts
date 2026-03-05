export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  fileUrl?: string
}
