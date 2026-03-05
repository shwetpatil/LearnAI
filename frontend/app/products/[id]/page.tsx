import { notFound } from "next/navigation"
import { getAllProducts, getProductById } from "../../lib/products"

/**
 * Pre-generate all product routes at build time
 */
export async function generateStaticParams() {
  const products = await getAllProducts()

  return products.map((product: any) => ({
    id: product.id,
  }))
}

/**
 * Product detail page (Next 15 style)
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <section aria-labelledby="product-title">
          
          <h1
            id="product-title"
            className="text-3xl font-bold text-gray-900"
          >
            {product.title}
          </h1>

          <div className="mt-3">
            <span className="sr-only">Category:</span>
            <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              {product.category}
            </span>
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
            
            <div>
              <p className="text-gray-500">Price</p>
              <p className="mt-1 text-xl font-semibold text-indigo-600">
                ${product.price}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Rating</p>
              <p
                className="mt-1 font-medium text-gray-900"
                aria-label={`Rating ${product.rating} out of 5`}
              >
                ⭐ {product.rating} / 5
              </p>
            </div>

            <div>
              <p className="text-gray-500">Stock</p>
              <p className="mt-1 font-medium text-gray-900">
                {product.stock > 0
                  ? `${product.stock} items available`
                  : "Out of stock"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Product ID</p>
              <p className="mt-1 font-medium text-gray-900">
                {product.id}
              </p>
            </div>

          </div>
        </section>
      </div>
    </main>
  )
}