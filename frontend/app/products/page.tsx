import Link from "next/link"
import { getProducts } from "../lib/products"

export default async function Page() {
  const products = await getProducts()

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product: any) => (
            <li key={product.id}>
              <Link
                href={`/products/${product.id}`}
                className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <p className="mt-4 font-semibold text-indigo-600">
                  ${product.price}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}