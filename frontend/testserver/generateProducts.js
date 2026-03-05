const fs = require("fs")
const path = require("path")

const DB_FILE = path.join(__dirname, "db.json")

const products = Array.from({ length: 1000 }, (_, i) => {
  const id = i + 1

  return {
    id: id.toString(),
    title: `ProductTest ${id}`,
    price: Math.floor(Math.random() * 2000) + 50,
    description: `This is a detailed description for product ${id}.`,
    category: ["Phones", "Laptops", "Accessories"][id % 3],
    rating: (Math.random() * 5).toFixed(1),
    stock: Math.floor(Math.random() * 100),
  }
})

let db = {}

if (fs.existsSync(DB_FILE)) {
  db = JSON.parse(fs.readFileSync(DB_FILE, "utf8"))
  console.log("📂 Existing db.json loaded")
}

db.products = products

fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))

console.log("✅ Products collection replaced/created successfully")