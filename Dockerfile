# Node Alpine Docker Image
FROM node:22.8.0-alpine3.20

# Variables
ARG PORT
ENV PORT=$PORT
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA

# Directories setup
WORKDIR /app

COPY app.js .
COPY middleware middleware
COPY package.json .
COPY package-lock.json .

RUN npm ci
RUN npm cache clean --force

# Expose listening port
EXPOSE ${PORT}

# Container healthcheck
HEALTHCHECK \
--interval=60s \
--timeout=30s \
CMD wget \
--no-verbose \
--tries=3 \
--spider http://localhost:${PORT}/healthcheck \
|| exit 1

# Execute Script
CMD ["npm", "run", "start"]
