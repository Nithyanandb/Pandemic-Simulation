# Use Node.js as the base image for the build stage
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code
COPY src ./src
COPY public ./public

# Build the React app for production
RUN npm run build

# Use a lightweight web server for serving static files
FROM nginx:alpine

# Copy the build output to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx is running on
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
