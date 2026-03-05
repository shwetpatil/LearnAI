import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="w-full border-b border-slate-700 bg-slate-800/50">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-semibold text-white">AI Chatbot</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-slate-200 hover:text-white transition">
              Home
            </Link>
            <Link href="/chat" className="text-slate-200 hover:text-white transition">
              Chat
            </Link>
            <Link href="/products" className="text-slate-200 hover:text-white transition">
              Products
            </Link>
            <Link href="/news" className="text-slate-200 hover:text-white transition">
              News
            </Link>
          </div>
        </div>
      </nav>

      <header className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Welcome to AI Chatbot
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Ask questions, get intelligent answers, and upload files for instant analysis.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
          >
            Go to Chat
          </Link>
        </div>
      </header>

      <footer className="border-t border-slate-700 bg-slate-800/50">
        <div className="mx-auto max-w-6xl px-6 py-4 text-sm text-slate-400 text-center">
          © 2026 AI Chatbot. Built with Next.js and Spring Boot.
        </div>
      </footer>
    </main>
  )
}
