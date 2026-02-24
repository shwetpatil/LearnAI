AI Chatbot Backend

Spring Boot 3.4 backend with JWT authentication, OpenAI integration, and PostgreSQL persistence.

⸻

🚀 Local Development Setup

Prerequisites
	•	Java 21
	•	Maven
	•	Docker Desktop (running)

Verify:

java -version
mvn -v
docker –version

⸻

🐳 Docker Setup (PostgreSQL Local Database)

This project uses PostgreSQL via Docker for local development.

⸻

1️⃣ docker-compose.yml

Make sure this file exists inside the backend directory:

services:
postgres:
image: postgres:16
container_name: aichatbot_postgres
restart: always
environment:
POSTGRES_DB: aichatbot
POSTGRES_USER: aichat_user
POSTGRES_PASSWORD: password123
ports:
- “5432:5432”
volumes:
- postgres_data:/var/lib/postgresql/data

volumes:
postgres_data:

⸻

2️⃣ Start PostgreSQL

From the backend folder:

docker compose up -d

Verify container:

docker ps

You should see:
	•	Image: postgres:16
	•	Port: 5432

⸻

3️⃣ Verify Database Exists

docker exec -it aichatbot_postgres psql -U aichat_user -d aichatbot

Inside PostgreSQL:

\l

You should see database:
aichatbot

Exit:

\q

⸻

4️⃣ Stop PostgreSQL

docker compose down

If you want to remove all database data:

docker compose down -v

⸻

🛠 Build & Run Backend

Build

mvn clean install

⸻

Start Backend (Development Profile)

mvn spring-boot:run

Application runs at:

http://localhost:8080

⸻

🧪 Test API Using curl

Register User

curl -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d '{"username":"john","email":"john@example.com","password":"pass123"}'

⸻

Login

curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"pass123"}'

⸻

Send Chat Message (Authenticated)

Replace YOUR_TOKEN with the JWT returned from login:

curl -X POST http://localhost:8080/api/chat 
-H “Authorization: Bearer YOUR_TOKEN” 
-F “message=Hello AI”

⸻

🔎 Optional: Connect to PostgreSQL Manually

docker exec -it aichatbot_postgres psql -U aichat_user -d aichatbot

List tables:

\dt

Exit:

\q

⸻

🌍 Production (AWS Ready)

Run production profile:

java -jar target/ai-chatbot-backend-1.0.0.jar –spring.profiles.active=prod

Required environment variables:

DB_URL
DB_USERNAME
DB_PASSWORD
OPENAI_API_KEY
JWT_SECRET

Example:

export DB_URL=jdbc:postgresql://your-rds-endpoint:5432/aichatbot
export DB_USERNAME=admin
export DB_PASSWORD=secret
export OPENAI_API_KEY=your_key
export JWT_SECRET=your_secret

Production uses:
	•	PostgreSQL (AWS RDS compatible)
	•	Hibernate schema validation
	•	Environment-based configuration

⸻

🧰 Tech Stack
	•	Spring Boot 3.4
	•	Java 21
	•	PostgreSQL
	•	Docker
	•	JWT (Spring Security)
	•	JPA / Hibernate
	•	OpenAI API

⸻

🔧 Troubleshooting

Port 8080 already in use:

lsof -ti :8080 | xargs kill -9

Restart database:

docker compose down
docker compose up -d

⸻

✅ Current Architecture
	•	Dockerized PostgreSQL (local)
	•	Dev profile with auto schema update
	•	Prod profile (AWS-compatible)
	•	Secure JWT authentication
	•	Persistent chat storage
