# AI Chatbot Backend

Spring Boot 3.4 AI Chatbot backend with OpenAI integration, JWT authentication, and JPA persistence.

## 🚀 Quick Start

```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Verify it's running (in another terminal)
curl -s http://localhost:8080 && echo "✓ Backend OK"
```

## Features

- 🤖 OpenAI GPT-3.5 Integration
- 🔐 JWT Authentication & Authorization
- 💾 Chat History with JPA
- 📁 File Upload Support
- 🚀 Spring Boot 3.4 with Java 21 LTS
- 🗄️ H2 Database (Development) / PostgreSQL (Production)

## Prerequisites

- **Java 21 LTS** (installed at `~/.jdk/jdk-21.0.8(1)/jdk-21.0.8+9/Contents/Home`)
- **Maven 3.9.12** (configured in `~/.zshrc`)
- OpenAI API Key (optional)

## Setup

### 1. Install Java 21 & Maven

Java and Maven are already configured globally in `~/.zshrc`:
```bash
export JAVA_HOME=/Users/siddharthy/.jdk/jdk-21.0.8'(1)'/jdk-21.0.8+9/Contents/Home
export MAVEN_HOME=/opt/homebrew/Cellar/maven/3.9.12/libexec
export PATH=$JAVA_HOME/bin:$MAVEN_HOME/bin:$PATH
```

Verify installation:
```bash
java -version
mvn -v
```

### 2. Navigate to Backend
```bash
cd /Users/siddharthy/Shweta-S/Learn/LaernAi/backend
```

### 3. Build Project
```bash
mvn clean install
```

### 4. Run the Backend

**Option A: Direct Run (Foreground)**
```bash
mvn spring-boot:run
```

**Option B: Run in Background**
```bash
mvn spring-boot:run > /tmp/backend.log 2>&1 &
```

**Option C: Build & Run JAR**
```bash
mvn clean package
java -jar target/ai-chatbot-backend-1.0.0.jar
```

## Verification

Check if backend is running:

### Option 1: Simple check
```bash
curl -s http://localhost:8080
```

### Option 2: With success message
```bash
curl -s http://localhost:8080 && echo "" && echo "✓ Backend is RUNNING"
```

### Option 3: Verbose output
```bash
curl -i http://localhost:8080
```

### Option 4: With timeout
```bash
curl -s -m 3 http://localhost:8080 && echo "✓ Backend responding"
```

### Option 5: Full system status
```bash
lsof -i :8080 | head -2 && curl -s http://localhost:8080 && echo "✓ API responding"
```

### Additional verification methods:
```bash
# Check port 8080 is listening
lsof -i :8080

# View logs (if running in background)
tail -50 /tmp/backend.log

# Test specific endpoints
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"pass123"}'
```

## Quick Commands

```bash
# Start backend in background
mvn spring-boot:run > /tmp/backend.log 2>&1 &

# Check if backend is running (FASTEST)
curl -s http://localhost:8080 && echo "✓ Backend OK"

# Check port 8080
lsof -i :8080 | head -5

# Stop backend
lsof -ti :8080 | xargs kill -9

# View backend logs
tail -20 /tmp/backend.log

# Clear and restart
lsof -ti :8080 | xargs kill -9 && sleep 2 && mvn spring-boot:run > /tmp/backend.log 2>&1 &

# Full status check
echo "=== Backend Status ===" && lsof -i :8080 | head -2 && curl -s http://localhost:8080 && echo "✓ Running"
```

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new user
  ```json
  {"username": "john", "email": "john@example.com", "password": "pass123"}
  ```
- **POST** `/api/auth/login` - Login user
  ```json
  {"email": "john@example.com", "password": "pass123"}
  ```
- **GET** `/api/auth/validate` - Validate JWT token

### Chat
- **POST** `/api/chat` - Send message to chatbot
- **GET** `/api/chat/history/{conversationId}` - Get conversation history

## Environment Variables (Optional)

```bash
export OPENAI_API_KEY=your-openai-api-key
export JWT_SECRET=your-jwt-secret-key
```

## Configuration

Edit `src/main/resources/application.yml` to configure:
- Database connection (H2 for dev, PostgreSQL for prod)
- OpenAI model and API settings
- JWT expiration and secret
- Server port (default: 8080)
- CORS origins

## Database

- **Development**: H2 in-memory database (auto-created)
- **Production**: Configure PostgreSQL in `application.yml`

## CORS Configuration

Frontend allowed origins:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

## Project Structure

- `src/main/java/com/aichatbot/`
  - `controller/` - REST endpoints (Auth, Chat)
  - `service/` - Business logic (Auth, Chat, OpenAI)
  - `model/` - JPA entities (User, ChatMessage)
  - `repository/` - Data access layer
  - `security/` - JWT authentication & filters
  - `config/` - Spring security configuration
  - `dto/` - Data transfer objects

## Troubleshooting

### Port 8080 already in use
```bash
lsof -ti :8080 | xargs kill -9
```

### Java version mismatch
```bash
java -version  # Should show Java 21.0.8
```

### Maven not found
```bash
source ~/.zshrc  # Reload shell configuration
mvn -v
```

## Technology Stack

- **Framework**: Spring Boot 3.4.0
- **Language**: Java 21 LTS
- **Build Tool**: Maven 3.9.12
- **Database**: H2 (Development) / PostgreSQL (Production)
- **Authentication**: JWT + Spring Security
- **ORM**: JPA/Hibernate
- **API**: RESTful

## Status

✅ Backend running on port 8080
✅ Java 21 LTS configured
✅ Maven globally accessible
✅ Authentication implemented
✅ CORS configuration updated
