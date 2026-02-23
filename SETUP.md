# Setup and Installation Guide

## ✨ Complete Setup for AI Chatbot Application

This guide will walk you through setting up the full-stack AI Chatbot application with Next.js frontend and Spring Boot backend.

## 📋 Prerequisites

### For Frontend:
- Node.js 18+ 
- npm or yarn
- Modern web browser

### For Backend:
- Java 17+
- Maven 3.8+
- OpenAI API Key (get from https://platform.openai.com/api-keys)

## 🚀 Quick Setup (5 minutes)

### 1. Clone and Navigate to Project
```bash
cd /Users/siddharthy/Shweta-S/Learn/LaernAi
```

### 2. Set Up Environment Variables

Copy the example file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:
```bash
OPENAI_API_KEY=sk-your-actual-api-key-here
JWT_SECRET=your-secure-jwt-secret-key
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

Update `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

Start frontend:
```bash
npm run dev
```

The frontend will be available at **http://localhost:3000**

### 4. Backend Setup

Open a new terminal:
```bash
cd backend
export OPENAI_API_KEY=sk-your-api-key
export JWT_SECRET=your-jwt-secret
mvn clean package -DskipTests
mvn spring-boot:run
```

The backend will be available at **http://localhost:8080**

## 🐳 Docker Setup (Alternative)

If you have Docker installed, you can run the entire stack with one command:

```bash
docker-compose up --build
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- PostgreSQL: localhost:5432

## 🔐 Authentication Setup

### Register a New User

Visit http://localhost:3000 and click "Register" to create a new account with:
- Email
- Username
- Password

### Login

Use your credentials to log in to the application.

## 🧪 Testing the Chatbot

1. Open http://localhost:3000
2. Register or login
3. Type a message and click Send
4. The chatbot will respond using OpenAI's GPT model

## 📝 API Testing with cURL

### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123"
  }'
```

### Send Chat Message
```bash
curl -X POST http://localhost:8080/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "message": "Hello, how are you?",
    "userId": "1"
  }'
```

## 🛠️ Troubleshooting

### OpenAI API Key Issues
- Ensure your API key is valid and has sufficient credits
- Check that the key is correctly set in environment variables
- Visit https://platform.openai.com/account/billing/overview to check your account status

### Port Already in Use
If port 3000 or 8080 is already in use:

**Frontend:**
```bash
# Use different port
PORT=3001 npm run dev
```

**Backend:**
Edit `backend/src/main/resources/application.yml`:
```yaml
server:
  port: 8081
```

### Database Connection Issues
For H2 (development):
- Data is stored in memory, check http://localhost:8080/h2-console

For PostgreSQL (with Docker):
- Ensure Docker is running
- Check PostgreSQL logs: `docker logs ai-chatbot-db`

## 📚 Documentation

- [Frontend README](./frontend/README.md) - Next.js setup details
- [Backend README](./backend/README.md) - Spring Boot configuration
- [API Documentation](./API_DOCS.md) - Detailed API endpoints

## 🎯 Next Steps

1. ✅ Register a new account
2. ✅ Send your first message
3. ✅ Explore file upload features
4. ✅ Check conversation history
5. ✅ Deploy to cloud (AWS, Heroku, DigitalOcean)

## 🚀 Production Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel (https://vercel.com)
```

### Backend (Railway/Render)
```bash
cd backend
mvn clean package
# Deploy to Railway or Render
```

## 🤝 Support

For issues:
1. Check the Troubleshooting section above
2. Review backend logs for errors
3. Check browser console (F12) for frontend errors
4. Refer to official documentation:
   - [Next.js Docs](https://nextjs.org/docs)
   - [Spring Boot Docs](https://spring.io/projects/spring-boot)
   - [OpenAI API Docs](https://platform.openai.com/docs)

## ✅ Verification Checklist

- [ ] Node.js and npm installed
- [ ] Java 17+ installed
- [ ] Maven installed
- [ ] OpenAI API key obtained
- [ ] Frontend dependencies installed
- [ ] Backend builds successfully
- [ ] Backend connects to OpenAI
- [ ] Frontend can reach backend API
- [ ] Database is initialized
- [ ] Application starts without errors

## 📞 Getting Help

If you encounter issues after following this guide:
1. Check environment variables are correctly set
2. Ensure all ports (3000, 8080) are available
3. Verify API keys are correct
4. Check that both frontend and backend are running
5. Review application logs for error messages
