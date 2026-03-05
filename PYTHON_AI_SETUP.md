# Python AI Service Setup Guide

## Overview

Your backend now has a Python-based AI service integrated! Here's what has been set up:

### Components Created:

1. **`ai-service/`** - New Python AI microservice
   - Flask application with multiple AI endpoints
   - Uses transformer models (GPT-2) for text generation
   - Provides chat, summarization, and classification APIs

2. **Java Integration**
   - `PythonAiService.java` - Service class to call Python AI endpoints
   - `PythonAiController.java` - REST controller exposing Python AI endpoints
   - `RestClientConfig.java` - HTTP client configuration

3. **Docker Support**
   - Updated `docker-compose.yml` with AI service
   - Python Dockerfile with proper dependencies

---

## Quick Start

### Option 1: Run Locally (Without Docker)

#### Setup Python AI Service:

```bash
# Navigate to ai-service directory
cd ai-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the service
python app.py
```

The service will start on `http://localhost:5000`

#### Test the service:

```bash
# Health check
curl http://localhost:5000/health

# Generate text
curl -X POST http://localhost:5000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Once upon a time",
    "max_length": 256,
    "temperature": 0.7
  }'
```

#### Update Java Backend Configuration:

In `backend/src/main/resources/application.yml`, the Python AI service URL is already configured:

```yaml
ai:
  service:
    url: http://localhost:5000
```

### Option 2: Run with Docker

```bash
# From project root
docker-compose up

# This will start:
# - PostgreSQL (port 5432)
# - Python AI Service (port 5000)
# - Java Backend (port 8080)
# - Next.js Frontend (port 3000)

# Health check
curl http://localhost:5000/health
curl http://localhost:8080/api/health
```

---

## Using Python AI Service from Java Backend

### 1. Direct Service Usage

```java
@Autowired
private PythonAiService pythonAiService;

// Generate text
String response = pythonAiService.generateResponse("Hello, how are you?");

// Chat with context
List<Map<String, String>> history = new ArrayList<>();
String chatResponse = pythonAiService.processChat(message, history);

// Summarize text
String summary = pythonAiService.summarizeText(longText);

// Classify text
Map<String, Object> classifications = pythonAiService.classifyText(text, categories);

// Check service health
boolean isHealthy = pythonAiService.isServiceHealthy();
```

### 2. Via REST API Endpoints

The Java backend exposes these endpoints that call the Python service:

```bash
# Health check
GET /api/python-ai/health

# Generate response
POST /api/python-ai/generate
{
  "prompt": "Your prompt here",
  "max_length": 256,
  "temperature": 0.7
}

# Chat
POST /api/python-ai/chat
{
  "message": "User message",
  "conversation_history": [],
  "max_length": 256
}

# Summarize
POST /api/python-ai/summarize
{
  "text": "Text to summarize",
  "max_length": 100
}

# Classify
POST /api/python-ai/classify
{
  "text": "Text to classify",
  "categories": ["positive", "negative", "neutral"]
}
```

---

## Integration with Existing Chat System

To integrate Python AI with your existing chat functionality, update `ChatService.java`:

```java
@Autowired
private PythonAiService pythonAiService;

public ChatResponse processMessage(ChatRequest request, String userId) {
    // ... existing code ...
    
    // Use Python AI instead of/alongside OpenAI
    String aiResponse = pythonAiService.processChat(
        request.getMessage(), 
        history
    );
    
    // ... save response ...
}
```

---

## API Endpoints Reference

### Python AI Service (Port 5000)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Service health check |
| `/api/ai/generate` | POST | Generate text from prompt |
| `/api/ai/chat` | POST | Process chat with context |
| `/api/ai/summarize` | POST | Summarize text |
| `/api/ai/classify` | POST | Classify text |

### Java Backend Proxy (Port 8080)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/python-ai/health` | GET | Check Python AI service |
| `/api/python-ai/generate` | POST | Generate text |
| `/api/python-ai/chat` | POST | Chat with history |
| `/api/python-ai/summarize` | POST | Summarize text |
| `/api/python-ai/classify` | POST | Classify text |

---

## Environment Variables

### Python AI Service (.env or docker-compose)
```
PORT=5000
FLASK_ENV=production
LOG_LEVEL=INFO
```

### Java Backend
```
AI_SERVICE_URL=http://ai-service:5000  # Docker
AI_SERVICE_URL=http://localhost:5000   # Local development
```

---

## Performance Considerations

1. **First Request Slow**: Model loading takes time on first request (~40 seconds)
2. **Response Time**: 2-10 seconds per request depending on input
3. **Memory**: Requires ~2GB RAM for model loading
4. **CPU vs GPU**: Uses CPU by default; GPU support available with CUDA

---

## Scaling Options

### 1. Multiple Python AI Instances
```yaml
ai-service-1:
  # ... service config ...
  ports: ["5000:5000"]

ai-service-2:
  # ... service config ...
  ports: ["5001:5000"]
```

### 2. Load Balancer (Nginx)
```nginx
upstream ai_service {
  server ai-service-1:5000;
  server ai-service-2:5000;
}

server {
  listen 5000;
  location / {
    proxy_pass http://ai_service;
  }
}
```

### 3. Cache Responses
Implement caching in Java service for similar requests

---

## Troubleshooting

### Python service won't start
```bash
# Check if port 5000 is already in use
lsof -i :5000

# Kill existing process
kill -9 <PID>
```

### Model loading is very slow
- Expected on first run (40-60 seconds)
- Models are cached in Docker volumes
- Subsequent runs are faster

### "Connection refused" error
- Ensure Python service is running
- Check AI_SERVICE_URL configuration
- Verify network connectivity (docker network)

### Out of memory
- Reduce `max_new_tokens` parameter
- Use a smaller model
- Allocate more container memory

---

## Next Steps

1. **Customize Models**: Replace GPT-2 with larger models in `ai-service/app.py`
2. **Add Authentication**: Implement API key validation
3. **Implement Caching**: Cache frequently requested responses
4. **Monitor Performance**: Add metrics and logging
5. **Fine-tune Models**: Train models on your specific domain data

---

## File Structure

```
ai-service/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker build configuration
├── .env.example          # Environment variables template
└── README.md             # Service documentation

backend/
├── src/main/java/com/aichatbot/
│   ├── service/
│   │   ├── PythonAiService.java      # NEW: AI service client
│   │   └── ChatService.java          # Existing chat service
│   ├── controller/
│   │   └── PythonAiController.java   # NEW: API endpoints
│   └── config/
│       └── RestClientConfig.java     # NEW: HTTP client config
└── src/main/resources/
    └── application.yml               # Updated with ai.service.url
```

---

## Support

For issues or questions:
1. Check Python AI Service logs: `docker logs ai-service`
2. Check Java Backend logs: `docker logs ai-chatbot-backend`
3. Test endpoints directly with curl
4. Review error messages in console output
