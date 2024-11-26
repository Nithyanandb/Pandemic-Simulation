# Use a Maven base image
FROM maven:3.9.0-eclipse-temurin-17 AS builder

# Set the working directory
WORKDIR /app

# Cache Maven dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Build the project
RUN mvn clean package -DskipTests

# Final image with only the build artifacts (you can use an openjdk image for the runtime)
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the build artifacts
COPY --from=builder /app/target/*.jar /app/app.jar

CMD ["java", "-jar", "/app/app.jar"]
