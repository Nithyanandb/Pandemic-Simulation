# Use Node.js image for building the React app
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
# Copy the rest of the application code
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Run the command to start the application when the container launches
CMD ["npm", "start"]
