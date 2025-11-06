
# Use official Node.js LTS image
FROM node:25-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build Next.js app

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "dev"]
