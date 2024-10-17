const request = require('supertest');
const express = require('express');
const healthcheck = require('./healthcheck');

describe('Middleware - healthcheck', () => {
  let app;

  beforeAll(() => {
    // Initialize an Express app and use the healthcheck router
    app = express();
    app.use('/', healthcheck);
  });

  afterEach(() => {
    delete process.env.GITHUB_SHA;
  });

  it('should return 200 response status for GET /healthcheck endpoint', async () => {
    const response = await request(app).get('/healthcheck');

    expect(response.status).toBe(200);
  });

  it('should return expected response body for GET /healthcheck endpoint', async () => {
    const response = await request(app).get('/healthcheck');

    // 1. Encapsulated response within `myapplication` array
    expect(response.body).toHaveProperty('myapplication');

    // 2. Ensure property is an array
    expect(Array.isArray(response.body.myapplication)).toEqual(true);

    // 3. Ensure sub-properties
    expect(response.body.myapplication[0].version).toBeDefined();
    expect(response.body.myapplication[0].description).toEqual('pre-interview technical test');
    expect(response.body.myapplication[0].lastcommitsha).toBeDefined();
  });

  it('should return expected last commit SHA in response body as a String for GET /healthcheck endpoint', async () => {
    const response = await request(app).get('/healthcheck');

    expect(response.body.myapplication[0].lastcommitsha).toBeDefined();
    expect(response.body.myapplication[0].lastcommitsha).toEqual(expect.any(String));
  });
});
