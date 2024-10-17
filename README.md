# 🚀 Node.js Health Check Application

This is a simple Node.js web application that exposes a `/healthcheck` endpoint.
It returns basic information about the application, including version, description
and the last commit SHA. It is designed to be lightweight and easy to deploy.

## ✨ Features

- **Health Check API:** Returns application version, description
  and last commit SHA.
- **Docker Support:** The application is fully containerized for easy deployment.
- **CI Pipeline:** GitHub Actions is used for automated testing, linting
  and Docker image building.

---

## 📋 Requirements

- **Docker** (to run the application in a container)
- **Node.js** (if running locally, version 22.8.0 or higher)
- **GitHub Account** (for CI if using GitHub Actions)

---

## 🛠️ How to Run the Application

You can run the application locally by following the steps defined below:

1. **Clone the repository**

   ```sh
   git clone https://github.com/abhi-markan/healthcheck.git
   cd healthcheck
   ```

2. **Specify environment variables**

   ```sh
   cp .env.sample .env
   nano .env
   ```

   Adjust variables per your preference.
   `RATE_LIMIT_THRESHOLD` is currently not implemented.

   ```text
   # APP
   PORT=3000
   NODE_ENV=development
   TZ=Europe/London
   RATE_LIMIT_THRESHOLD=300
   ```

3. **Build the Docker image**

   ```sh
   docker build -t healthcheck . \
   --build-arg PORT=3000 \
   --build-arg GITHUB_SHA=sha5123
   ```

4. **Run the Docker image**

   ```sh
   docker run -p 3000:3000 healthcheck
   ```

5. **Run the app locally without Docker**

   ```sh
   npm run start
   ```

6. **Execute Jest unit test cases**

   ```sh
   npm run unit-test
   ```

7. **Invoke the endpoint**

   ```sh
   curl http://localhost:3000/healthcheck
   ```

   You should expect to receive the following response body when executing locally:

   ```json
   {
     "myapplication": [
       {
         "version": "1.0.0",
         "description": "pre-interview technical test",
         "lastcommitsha": "sha5123"
       }
     ]
   }
   ```

---

## ⚠️ Known Risks

- **Dependencies**: Since the application uses third-party packages like Express
  vulnerabilities in those packages can affect the application. To mitigate this
  tools like npm audit can help identify and fix potential vulnerabilities in dependencies.

- **Lack of Authentication**: If the `/healthcheck` endpoint is exposed to the public
  it could potentially reveal sensitive information such as application version
  or commit hashes, which could be leveraged in attacks. Restrict access to this
  endpoint, especially in production environments. API key header or authorization
  header is recommended.

- **DDoS**: The app currently does not implement any rate limiting neither at
  infrastructure nor at application level.

- **CSP**: The application does not implement any CSP headers.

- **XSS**: The application does not implement any XSS mitigation strategies.

- **CSRF**: The application does not implement any CSRF mitigation strategies.

- **Load Balancing**: No load balancing has been configured as the application
  is executed on a single Express instance.
- **Monitoring**: The application does not implement any monitoring, logging
  and alerting strategies.
- **Deployment Authorization**: Although not in scope, the application notdoes
  cover any deployment service principals.

- **Misconfigured CI**: The pipeline does not prevent deployment if a test fails.

- **Docker Build**: Docker build is currently not a multi-stage build which can
  allow execution of vulnerable scripts in a final built image.
