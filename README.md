# Node.js Health Check Application

This is a simple Node.js web application that exposes a `/healthcheck` endpoint.
Which returns basic information about the application, including version, description
and the last commit SHA. It is designed to be lightweight and easy to deploy.

## Features

- **Health Check API:** Returns application version, descriptionand last commit SHA.
- **Docker Support:** The application is fully containerized for easy deployment.
- **CI Pipeline:** GitHub Actions is used for automated testing, linting, and Docker
image building.

---

## Requirements

- **Docker** (to run the application in a container)
- **Node.js** (if running locally, version 22.8.0 or higher)
- **GitHub Account** (for CI if using GitHub Actions)

---

## How to Run the Application

Once can run the application locally by following steps defined below:

- Clone the repository

   ```sh
   git clone https://github.com/abhi-markan/healthcheck.git

   cd healthcheck
   ```

- Specify environment variable

```sh
cp .env.sample .env
nano .env
```

Adjust variables per your preference.
`RATE_LIMIT_THRESHOLD` is currently not implemented

```text
# APP
PORT=3000
NODE_ENV=development
TZ=Europe/London
RATE_LIMIT_THRESHOLD=300
```

- Build the image

```sh
docker build -t healthcheck .
```

- Run the image

```sh
docker run healthcheck
```

One can also runt the app locally without docker build

```sh
npm run start
```

- Execute Jest unit test cases

```sh
npm run unit-test
```
