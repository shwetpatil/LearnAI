const fs = require("fs")

const products = Array.from({ length: 1000 }, (_, i) => {
  const id = i + 1

  return {
    id: id.toString(),
    title: `ProductTest ${id}`,
    price: Math.floor(Math.random() * 2000) + 50,
    description: `This is a detailed description for product ${id}. It is built for reliability, performance, and everyday usage.`,
    category: ["Phones", "Laptops", "Accessories"][id % 3],
    rating: (Math.random() * 5).toFixed(1),
    stock: Math.floor(Math.random() * 100),
  }
})

fs.writeFileSync(
  "db.json",
  JSON.stringify({ products }, null, 2)
)

console.log("✅ db.json with 1000 products generated.")