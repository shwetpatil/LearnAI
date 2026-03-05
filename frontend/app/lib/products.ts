export async function getProducts() {
  const res = await fetch("http://localhost:8000/products", {
    cache: "force-cache",
  })

  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export async function getAllProducts() {
  const res = await fetch(
    `http://localhost:8000/products`,
    { cache: "force-cache" }
  )

  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export async function getProductById(id: string) {
  const res = await fetch(
    `http://localhost:8000/products/${id}`,
    { cache: "force-cache" }
  )

  if (!res.ok) return null

  return res.json()
}
/* export async function getProducts() {
  const res = await fetch("http://localhost:8000/products", {
    cache: "force-cache"
  })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}
 */
/*  export async function getProducts() {
 const res = await fetch("http://localhost:8000/products", {
   cache: "no-store",
 })

 if (!res.ok) {
   throw new Error("Failed to fetch products")
 }

 return res.json()
} */