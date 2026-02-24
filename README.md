# AI Chatbot - Full Stack Application

A modern AI chatbot application built with **Next.js 14** frontend and **Spring Boot 3.2** backend, powered by **OpenAI GPT**.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (for frontend)
- Java 17+ (for backend)
- OpenAI API Key
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Update .env.local with your settings
npm run dev
```

Frontend: [http://localhost:3000](http://localhost:3000)

### Backend Setup

```bash
cd backend
export OPENAI_API_KEY=your-api-key
export JWT_SECRET=your-secret-key
mvn spring-boot:run
```

Backend: [http://localhost:8080](http://localhost:8080)

## 📁 Project Structure

```
.
├── frontend/              # Next.js React frontend
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utilities and API client
│   └── package.json     # Dependencies
│
└── backend/             # Spring Boot Java backend
    ├── src/
    │   ├── main/java/com/aichatbot/
    │   │   ├── controller/    # REST endpoints
    │   │   ├── service/       # Business logic
    │   │   ├── model/         # JPA entities
    │   │   ├── repository/    # Data access
    │   │   ├── security/      # JWT auth
    │   │   └── config/        # Configuration
    │   └── resources/
    │       └── application.yml
    └── pom.xml          # Maven dependencies
```

## ✨ Key Features

### Frontend
- 💬 Real-time chat interface with markdown rendering
- 🎨 Beautiful dark UI with Tailwind CSS
- 📁 File upload capability
- 📱 Fully responsive design
- ⚡ Server-side rendering with Next.js 14

### Backend
- 🤖 OpenAI ChatGPT integration
- 🔐 JWT authentication with Spring Security
- 💾 PostgreSQL/H2 database with JPA
- 📝 Conversation history
- 🚀 RESTful API with CORS support

## 🔧 Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### Backend (shell environment)

```bash
export OPENAI_API_KEY=sk-...
export JWT_SECRET=your-jwt-secret
```

## 📚 API Documentation

### Authentication

**Register:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password"
}
```

**Login:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

### Chat

**Send Message:**
```bash
POST /api/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Hello, how are you?",
  "conversationId": "uuid",
  "userId": "1"
}
```

**Get History:**
```bash
GET /api/chat/history/{conversationId}
Authorization: Bearer <token>
```

## 🐳 Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up --build
```

## 🎯 Development Roadmap

- [ ] WebSocket support for real-time streaming
- [ ] Multiple AI models support
- [ ] File analysis and processing
- [ ] User preferences and settings
- [ ] Admin dashboard
- [ ] Rate limiting
- [ ] Analytics and logging

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please feel free to submit issues and pull requests.

## 📞 Support

For issues and questions:
1. Check existing issues
2. Create a new issue with detailed description
3. Include environment details (OS, versions, etc.)
# LearnAI
