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
      id: id, // ✅ numeric
      title: `Breaking ${category} News Headline ${id}`,
      summary: `This is a short summary for news article ${id}.`,
      content: `Full content of article ${id}.`,
      image: `https://picsum.photos/seed/news${id}/800/400`,
      category,
      author,
      publishedAt: new Date(
        Date.now() - i * 1000 * 60 * 60
      ).toISOString(),
      views: Math.floor(Math.random() * 50000),
      tags: [category, "Trending", "Latest"],
    }
  })
}

let db = {}

// 1️⃣ If file exists → read it
if (fs.existsSync(DB_FILE)) {
  const rawData = fs.readFileSync(DB_FILE, "utf-8")
  db = JSON.parse(rawData)
  console.log("📂 Existing db.json found.")
} else {
  console.log("📂 db.json not found. Creating new one.")
}

// 2️⃣ Generate fresh news
const news = generateNews()

// 3️⃣ Replace if exists, add if not
if (db.news) {
  console.log("📰 Replacing existing news collection.")
} else {
  console.log("📰 Adding news collection.")
}

db.news = news

// 4️⃣ Write file
fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))

console.log("✅ News collection updated successfully.")