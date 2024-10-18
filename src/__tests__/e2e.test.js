import { describe, before, after, it } from 'node:test';
import { deepStrictEqual, ok, strictEqual } from 'node:assert';

const BASE_URL = 'http://localhost:3000';

describe('E2E Test on Routes', () => {
  let app;

  before(async () => {
    process.env.NODE_ENV = 'test';
    app = (await import('../../index.js')).app;
    await new Promise(resolve => app.on('listening', resolve));
  })

  after(done => app.close(done));

  describe('HealthCheck Route', () => {
    it('Should return 200 as statusCode', async () => {
      const request = await fetch(`${BASE_URL}/healthcheck`, {
        method: 'GET',
      })

      strictEqual(request.status, 200);
      const response = await request.json();
      deepStrictEqual(response.message, 'Server is running');
      deepStrictEqual(response.status, 'OK');
      ok(response.alert);
    })
  })

  describe('List Users Route', () => {
    it('Should return 200 as statusCode', async () => {
      const request = await fetch(`${BASE_URL}/v1/users`, {
        method: 'GET',
      })

      strictEqual(request.status, 200);
      const response = await request.json();
      deepStrictEqual(response.total, 1);
    })
  })

  describe('Create User Route', () => {
    it('Should return 201 as statusCode', async () => {
      const request = await fetch(`${BASE_URL}/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'New Test User',
          email: 'newuser@test.com',
          password: 'test123'
        })
      });

      strictEqual(request.status, 201);
      const response = await request.json();
      deepStrictEqual(response.name, 'New Test User');
    })
  })
})