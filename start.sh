#!/bin/sh

# Frontend startup script
echo "Starting AI Chatbot Frontend..."
cd frontend
npm install
npm run dev &

# Backend startup script  
echo "Starting AI Chatbot Backend..."
cd ../backend
mvn clean package -DskipTests
mvn spring-boot:run &

wait
