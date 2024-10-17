import { describe, before, after, it } from 'node:test';
import { deepStrictEqual, ok, strictEqual } from 'node:assert';

const BASE_URL = 'http://localhost:3000';

describe('Health Check Route', () => {
  let app;

  before(async () => {
    process.env.NODE_ENV = 'test'; 
    app = (await import('../../../../index.js')).app;
    await new Promise(resolve => app.on('listening', resolve));
  })

  after(done => app.close(done));

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