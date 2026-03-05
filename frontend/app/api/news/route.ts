import { fetchNewsFromBackend } from "../../lib/news"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const cursor = searchParams.get("cursor")
  const limit = 12

  try {
    const news = await fetchNewsFromBackend({
      cursor,
      limit,
    })

    return new Response(JSON.stringify(news), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60",
      },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch news" }),
      { status: 500 }
    )
  }
}