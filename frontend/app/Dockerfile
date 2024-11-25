# Use Node.js image for building the React app
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the React app
RUN npm run build

# Set up the nginx image for serving the static files
FROM nginx:alpine

# Copy the build files from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 3000
