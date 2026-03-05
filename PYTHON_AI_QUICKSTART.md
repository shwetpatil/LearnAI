# Quick Start - Python AI Service

Your project now includes a Python-based AI service! Here's how to get started:

## ⚡ Fastest Way to Start (Docker)

```bash
# From project root
docker-compose up
```

This starts everything:
- PostgreSQL (port 5432)
- **Python AI Service** (port 5000) ← NEW
- Java Backend (port 8080)
- Frontend (port 3000)

## 🧪 Test the Python AI Service

```bash
# Health check
curl http://localhost:5000/health

# Generate text
curl -X POST http://localhost:5000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello world", "max_length": 100, "temperature": 0.7}'

# Chat
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How are you?", "conversation_history": []}'
```

## 📖 Full Documentation

See [PYTHON_AI_SETUP.md](./PYTHON_AI_SETUP.md) for:
- Detailed setup instructions (local & Docker)
- All API endpoints
- How to integrate with your Java backend
- Troubleshooting guide

## 🚀 Use Python AI in Your Code

In your Java services, inject and use `PythonAiService`:

```java
@Autowired
private PythonAiService pythonAiService;

// Generate response
String response = pythonAiService.generateResponse("Your prompt");

// Process chat
String chatResponse = pythonAiService.processChat(message, conversationHistory);

// Summarize text
String summary = pythonAiService.summarizeText(longText);

// Classify text
Map<String, Object> classifications = pythonAiService.classifyText(text, categories);
```

## 📁 What Was Added

```
ai-service/              ← New Python service
├── app.py              # Flask application
├── requirements.txt    # Dependencies
├── Dockerfile          # Docker config
└── README.md          # Service docs

backend/src/main/java/com/aichatbot/
├── service/
│   └── PythonAiService.java      ← NEW: Client for Python service
└── controller/
    └── PythonAiController.java   ← NEW: REST endpoints

docker-compose.yml               # Updated with Python service
application.yml                  # Updated with AI service config
```

## 🔗 REST API Endpoints

**Python Service (port 5000):**
- `GET /health` - Service health
- `POST /api/ai/generate` - Generate text
- `POST /api/ai/chat` - Chat with context
- `POST /api/ai/summarize` - Summarize text
- `POST /api/ai/classify` - Classify text

**Java Backend (port 8080):**
- `GET /api/python-ai/health` - Check Python service
- `POST /api/python-ai/generate` - Generate text
- `POST /api/python-ai/chat` - Chat
- `POST /api/python-ai/summarize` - Summarize
- `POST /api/python-ai/classify` - Classify

## 📝 Run Test Suite

```bash
chmod +x test-ai-service.sh
./test-ai-service.sh
```

## ❓ Need Help?

1. Check [PYTHON_AI_SETUP.md](./PYTHON_AI_SETUP.md) for detailed documentation
2. View Python service logs: `docker logs ai-service`
3. View backend logs: `docker logs ai-chatbot-backend`
4. Check the test script: `test-ai-service.sh`

---

**That's it! Your Python AI service is ready to use! 🎉**
