"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

type NewsItem = {
  id: string
  title: string
  summary: string
  image: string
  category: string
  author: string
  publishedAt: string
}

export default function NewsFeed({
  initialNews,
}: {
  initialNews: NewsItem[]
}) {
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          hasMore
        ) {
          loadMore()
        }
      },
      { rootMargin: "200px" }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [loading, hasMore])

  async function loadMore() {
    if (loading || !hasMore) return

    setLoading(true)

    const lastItem = news[news.length - 1]
    const cursor = lastItem?.publishedAt

    const res = await fetch(`/api/news?cursor=${cursor}`)

    if (!res.ok) {
      setLoading(false)
      return
    }

    const newData: NewsItem[] = await res.json()

    if (!newData.length) {
      setHasMore(false)
    } else {
      setNews(prev => [...prev, ...newData])
    }

    setLoading(false)
  }

  return (
    <div className="mt-8 space-y-8">
      {news.map(article => (
        <article
          key={article.id}
          className="mx-auto max-w-3xl rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden"
        >
          <div className="relative h-56 w-full">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold">
              {article.title}
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              {article.summary}
            </p>

            <p className="mt-4 text-xs text-gray-500">
              {article.author} •{" "}
              {new Date(
                article.publishedAt
              ).toLocaleDateString()}
            </p>
          </div>
        </article>
      ))}

      <div
        ref={loaderRef}
        className="py-10 text-center text-sm text-gray-500"
      >
        {loading
          ? "Loading more..."
          : !hasMore
          ? "No more news"
          : ""}
      </div>
    </div>
  )
}