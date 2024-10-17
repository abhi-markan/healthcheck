/**
 * This script sets up an Express.js server, loads environment variables, and applies middleware for health checks.
 * It ensures that the server runs on a specified port and handles errors gracefully.
 */

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

// Import Middlewares
const healthcheck = require('./middleware/healthcheck');

try {
  /**
   * Extracts the PORT variable from process.env.
   * Throws an error if PORT is not specified.
   */
  const { PORT } = process.env;

  if (!PORT) {
    throw new Error('Invalid port %s specified', PORT);
  }

  const app = express();

  /**
   * Middleware pattern
   * Ensure code is DRY and follows SOLID principles
   * Applies the healthcheck middleware.
   */
  app.use(healthcheck);

  /**
   * Starts the server on the specified PORT and logs a success message.
   */
  app.listen(PORT, () => console.info('✅ Microservice initialised on %s', PORT));
} catch (error) {
  /**
   * Catches and logs any errors that occur during initialization.
   */
  console.error('❌ Microservice intialisation failed %o', error);
}
