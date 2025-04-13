# Stage 1: Build frontend and Go binary
FROM node:23-slim AS frontend-builder

# Set working directory
WORKDIR /app

# Copy frontend only
COPY frontend ./frontend

# Install and build frontend
RUN cd frontend && npm install && npm run build

# Stage 2: Build Wails Go app
FROM golang:1.24-slim AS go-builder

WORKDIR /app

# Install Wails CLI globally (optional if vendored)
RUN go install github.com/wailsapp/wails/v2/cmd/wails@latest

# Copy entire project
COPY . .

# Copy built frontend
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Build the Wails application
RUN wails build

# Stage 3: Final minimal image (optional, only if you want to distribute binary)
FROM alpine:latest

WORKDIR /app

# Copy final binary from builder
COPY --from=go-builder /app/build/bin/* ./app

# Expose if needed (usually not for native apps)
# EXPOSE 3000

# Run the app (change `app` to your actual binary name if needed)
ENTRYPOINT ["./app"]
