export async function fetchNewsFromBackend({
  cursor,
  limit,
}: {
  cursor: string | null
  limit: number
}) {
  let url =
    `http://localhost:8000/news` +
    `?_sort=id&_order=desc&_limit=${limit}`

  if (cursor) {
    url += `&id_lt=${cursor}`
  }

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Backend fetch failed")
  }

  return res.json()
}