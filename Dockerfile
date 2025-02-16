# Use Node.js base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (better for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code, including tsconfig.json
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 4000

# Run migrations before starting the server
CMD npm run start