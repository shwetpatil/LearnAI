# AI Chatbot Frontend

Next.js 14+ AI Chatbot frontend with TypeScript, authentication, real-time chat, and file upload.

## Features

- 💬 Real-time chat interface with markdown support
- 🔐 Secure authentication
- 📁 File upload and processing
- 🎨 Beautiful dark UI with Tailwind CSS
- 📱 Responsive design
- ⚡ Server-side rendering with Next.js 14

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Create `.env.local`:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

3. Update `.env.local` with your settings:
   - \`NEXT_PUBLIC_API_URL\`: Backend API URL
   - \`NEXTAUTH_SECRET\`: Secret key for NextAuth

4. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Building

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

- \`app/\` - Next.js app directory
- \`app/components/\` - React components
- \`app/lib/\` - Utilities and API clients
- \`public/\` - Static files
