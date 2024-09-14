# Build stage for the frontend
FROM node:17 AS builder
WORKDIR /app

# Copy and install frontend dependencies
COPY frontend/package*.json ./
COPY frontend/yarn.lock ./
RUN yarn

# Copy the frontend source code and build it
COPY frontend/ .
RUN yarn build

# Production stage
FROM node:17
WORKDIR /app

# Copy the backend package files and install dependencies
COPY backend/package*.json ./
COPY backend/yarn.lock ./
RUN yarn

# Copy the backend source code
COPY backend/src ./src

# Copy frontend built static files -> frontend/build/..
COPY --from=builder /app/build ./frontend/build

EXPOSE 4000

CMD ["yarn", "start"]
