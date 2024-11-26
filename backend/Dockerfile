# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy the JAR file from the target folder to the container
COPY target/CovidData-0.0.1-SNAPSHOT.jar /app/app.jar

# Run the JAR file when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]
