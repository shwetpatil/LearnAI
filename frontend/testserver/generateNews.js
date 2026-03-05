const fs = require("fs")
const path = require("path")

const DB_FILE = path.join(__dirname, "db.json")

const categories = ["Tech", "Business", "Sports", "Health", "Science"]
const authors = ["John Doe", "Jane Smith", "David Miller", "Priya Sharma", "Alex Johnson"]

function generateNews() {
  return Array.from({ length: 1000 }, (_, i) => {
    const id = i + 1
    const category = categories[i % categories.length]
    const author = authors[i % authors.length]

    return {
      id,
      title: `Breaking ${category} News Headline ${id}`,
      summary: `This is a short summary for news article ${id}.`,
      content: `Full content of article ${id}.`,
      image: `https://picsum.photos/seed/news${id}/800/400`,
      category,
      author,
      publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
      views: Math.floor(Math.random() * 50000),
      tags: [category, "Trending", "Latest"],
    }
  })
}

let db = {}

if (fs.existsSync(DB_FILE)) {
  db = JSON.parse(fs.readFileSync(DB_FILE, "utf8"))
  console.log("📂 Existing db.json loaded")
}

db.news = generateNews()

fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))

console.log("✅ News collection replaced/created successfully")