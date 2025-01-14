# Use the latest Node.js LTS version (16 or 18 as of now)
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if using Yarn)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port for the Vite dev server (default 5173)
EXPOSE 5173

# Set the default command to run the Vite development server
CMD ["npm", "run", "dev"]