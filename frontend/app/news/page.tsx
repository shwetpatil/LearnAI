import { fetchNewsFromBackend } from "../lib/news"
import NewsFeed from "./NewsFeed"

export default async function NewsPage() {
  // First page = no cursor
  const initialNews = await fetchNewsFromBackend({
    cursor: null,
    limit: 12,
  })

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Latest News</h1>
      <NewsFeed initialNews={initialNews} />
    </main>
  )
}