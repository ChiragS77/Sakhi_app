# ---------- Build stage: compile and package the jar ----------
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /build

# Copy pom first so dependencies are cached between builds
COPY pom.xml .
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B clean package -DskipTests

# ---------- Run stage: small image with only Java and the jar ----------
FROM eclipse-temurin:17-jre
WORKDIR /app

# Run as a non-root user
RUN useradd --system --no-create-home appuser

COPY --from=build /build/target/*.jar app.jar

USER appuser
EXPOSE 8080

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-jar", "app.jar"]