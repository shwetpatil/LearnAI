#!/bin/bash
# Python AI Service - Test Scripts
# Use these curl commands to test the Python AI service endpoints

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PYTHON_AI_URL="${PYTHON_AI_URL:-http://localhost:5000}"
JAVA_BACKEND_URL="${JAVA_BACKEND_URL:-http://localhost:8080}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Python AI Service Test Suite${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Test 1: Python AI Service Health
echo -e "${GREEN}[TEST 1] Python AI Service Health Check${NC}"
echo "Endpoint: GET $PYTHON_AI_URL/health"
curl -X GET "$PYTHON_AI_URL/health" \
  -H "Content-Type: application/json" \
  -s | jq .
echo ""
echo ""

# Test 2: Java Backend Python AI Health
echo -e "${GREEN}[TEST 2] Java Backend - Python AI Health Check${NC}"
echo "Endpoint: GET $JAVA_BACKEND_URL/api/python-ai/health"
curl -X GET "$JAVA_BACKEND_URL/api/python-ai/health" \
  -H "Content-Type: application/json" \
  -s | jq .
echo ""
echo ""

# Test 3: Generate Text
echo -e "${GREEN}[TEST 3] Generate Text Response${NC}"
echo "Endpoint: POST $PYTHON_AI_URL/api/ai/generate"
curl -X POST "$PYTHON_AI_URL/api/ai/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "The future of artificial intelligence is",
    "max_length": 100,
    "temperature": 0.7
  }' \
  -s | jq .
echo ""
echo ""

# Test 4: Generate via Java Backend
echo -e "${GREEN}[TEST 4] Generate Text via Java Backend${NC}"
echo "Endpoint: POST $JAVA_BACKEND_URL/api/python-ai/generate"
curl -X POST "$JAVA_BACKEND_URL/api/python-ai/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Machine learning is the process of",
    "max_length": 100,
    "temperature": 0.5
  }' \
  -s | jq .
echo ""
echo ""

# Test 5: Chat
echo -e "${GREEN}[TEST 5] Chat Interaction${NC}"
echo "Endpoint: POST $PYTHON_AI_URL/api/ai/chat"
curl -X POST "$PYTHON_AI_URL/api/ai/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, how are you today?",
    "conversation_history": [
      {"role": "user", "content": "Hi"},
      {"role": "assistant", "content": "Hello! How can I help?"}
    ],
    "max_length": 150
  }' \
  -s | jq .
echo ""
echo ""

# Test 6: Chat via Java Backend
echo -e "${GREEN}[TEST 6] Chat via Java Backend${NC}"
echo "Endpoint: POST $JAVA_BACKEND_URL/api/python-ai/chat"
curl -X POST "$JAVA_BACKEND_URL/api/python-ai/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is machine learning?",
    "conversation_history": [],
    "max_length": 150
  }' \
  -s | jq .
echo ""
echo ""

# Test 7: Summarization
echo -e "${GREEN}[TEST 7] Text Summarization${NC}"
echo "Endpoint: POST $PYTHON_AI_URL/api/ai/summarize"
curl -X POST "$PYTHON_AI_URL/api/ai/summarize" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Artificial intelligence (AI) is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chances of achieving its goals. The term artificial intelligence was first coined in 1956 at the Dartmouth Summer Research Project on Artificial Intelligence.",
    "max_length": 50
  }' \
  -s | jq .
echo ""
echo ""

# Test 8: Summarization via Java Backend
echo -e "${GREEN}[TEST 8] Summarization via Java Backend${NC}"
echo "Endpoint: POST $JAVA_BACKEND_URL/api/python-ai/summarize"
curl -X POST "$JAVA_BACKEND_URL/api/python-ai/summarize" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically typed and garbage-collected.",
    "max_length": 50
  }' \
  -s | jq .
echo ""
echo ""

# Test 9: Classification
echo -e "${GREEN}[TEST 9] Text Classification${NC}"
echo "Endpoint: POST $PYTHON_AI_URL/api/ai/classify"
curl -X POST "$PYTHON_AI_URL/api/ai/classify" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This product is absolutely amazing! I love it!",
    "categories": ["positive", "negative", "neutral"]
  }' \
  -s | jq .
echo ""
echo ""

# Test 10: Classification via Java Backend
echo -e "${GREEN}[TEST 10] Classification via Java Backend${NC}"
echo "Endpoint: POST $JAVA_BACKEND_URL/api/python-ai/classify"
curl -X POST "$JAVA_BACKEND_URL/api/python-ai/classify" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This is terrible and disappointing!",
    "categories": ["positive", "negative", "neutral"]
  }' \
  -s | jq .
echo ""
echo ""

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}All tests completed!${NC}"
echo -e "${BLUE}========================================${NC}"
