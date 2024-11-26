# Use OpenJDK 21 slim image
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the compiled Spring Boot JAR file
COPY target/CovidData-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the app will run on
EXPOSE 2000

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
