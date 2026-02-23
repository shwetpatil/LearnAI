# Use official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy maven wrapper and pom.xml
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn/

# Build the application
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Copy the jar file
COPY target/ai-chatbot-backend-1.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
