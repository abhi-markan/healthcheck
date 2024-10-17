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

# Execute Script
CMD ["npm", "run", "start"]
