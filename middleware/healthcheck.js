/**
 * This module sets up a health check endpoint for an Express.js application.
 * It loads environment variables, defines a response object, and sets up a route
 * to return the health check information.
 */

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
const { GITHUB_SHA } = process.env;

const version = '1.0.0';
const description = 'pre-interview technical test';
const lastcommitsha = GITHUB_SHA || 'undefined';

const response = {
  version,
  description,
  lastcommitsha,
};

/**
 * GET /healthcheck
 * Returns the health check information including version, description, and last commit SHA.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get('/healthcheck', (req, res) => {
  res.status(200).json({
    myapplication: [response],
  });
});

module.exports = router;
