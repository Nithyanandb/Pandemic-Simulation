# Use an official Node.js 18 image as the base
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install
    
# Copy the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Expose the port
EXPOSE 3000

# Run the command to start the React application
CMD ["npm", "start"]