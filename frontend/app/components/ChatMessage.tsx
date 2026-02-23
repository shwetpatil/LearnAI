'use client'

import { Message } from '../page'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-md lg:max-w-2xl rounded-lg p-4 ${
          message.role === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-700 text-slate-100'
        }`}
      >
        {message.role === 'assistant' ? (
          <ReactMarkdown
            components={{
              code: ({ inline, className, children, ...props }: any) =>
                !inline ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={
                      className?.replace('language-', '') || 'text'
                    }
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-slate-600 px-2 py-1 rounded text-sm">
                    {children}
                  </code>
                ),
              p: ({ children }) => (
                <p className="mb-2 last:mb-0">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-2">{children}</ol>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
        {message.fileUrl && (
          <div className="mt-2 text-sm">
            <a
              href={message.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              📎 Download File
            </a>
          </div>
        )}
        <span className="text-xs opacity-70 mt-2 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}
