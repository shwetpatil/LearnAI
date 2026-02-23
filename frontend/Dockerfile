# Use official Node.js runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the application
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
