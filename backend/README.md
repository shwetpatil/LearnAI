# AI Chatbot Backend

Spring Boot 3.2 AI Chatbot backend with OpenAI integration, JWT authentication, and JPA persistence.

## Features

- 🤖 OpenAI GPT-3.5 Integration
- 🔐 JWT Authentication
- 💾 Chat History with JPA
- 📁 File Upload Support
- 🚀 Spring Boot 3.2 with Java 17

## Prerequisites

- Java 17 or higher
- Maven 3.8+
- OpenAI API Key

## Setup

1. Clone and navigate to backend folder
   \`\`\`bash
   cd backend
   \`\`\`

2. Set environment variables:
   \`\`\`bash
   export OPENAI_API_KEY=your-openai-api-key-here
   export JWT_SECRET=your-jwt-secret-key
   \`\`\`

3. Build the project:
   \`\`\`bash
   mvn clean package
   \`\`\`

4. Run the application:
   \`\`\`bash
   mvn spring-boot:run
   \`\`\`

The server will start on [http://localhost:8080](http://localhost:8080)

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/validate` - Validate token

### Chat
- **POST** `/api/chat` - Send message to chatbot
- **GET** `/api/chat/history/{conversationId}` - Get conversation history

## Configuration

Edit \`src/main/resources/application.yml\` to configure:
- Database connection
- OpenAI model and API settings
- JWT settings
- Server port

## Database

Development uses H2 in-memory database. For production, configure PostgreSQL in \`application.yml\`.

## Project Structure

- \`src/main/java/com/aichatbot/\`
  - \`controller/\` - REST endpoints
  - \`service/\` - Business logic
  - \`model/\` - JPA entities
  - \`repository/\` - Data access
  - \`security/\` - JWT authentication
  - \`config/\` - Spring configuration
  - \`dto/\` - Data transfer objects
