# Node Alpine Docker Image
FROM node:23.0.0-alpine3.20

# Variables
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

# Execute Script
CMD ["npm", "run", "start"]
