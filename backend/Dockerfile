# ── Fase 1: Compilación ──────────────────────────────────────
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Copiamos primero solo los ficheros de dependencias
# Docker cachea esta capa — si no cambian las deps, no las vuelve a descargar
COPY build.gradle.kts settings.gradle.kts ./
COPY gradle gradle
COPY gradlew .

# Descargamos dependencias (capa cacheada)
RUN ./gradlew dependencies --no-daemon

# Ahora copiamos el código fuente
COPY src src

# Compilamos y generamos el jar (sin tests — los tests van en CI)
RUN ./gradlew bootJar --no-daemon -x test

# ── Fase 2: Runtime ──────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime

WORKDIR /app

# Creamos un usuario no-root — nunca ejecutes apps como root en producción
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copiamos solo el jar desde la fase anterior
COPY --from=builder /app/build/libs/*.jar app.jar

# Puerto que expone el contenedor
EXPOSE 8080

# Opciones JVM optimizadas para contenedores
ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-jar", "app.jar"]