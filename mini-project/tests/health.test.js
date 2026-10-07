import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

import app from '../src/app.js';

describe('GET /health', () => {
  test('should return status ok and timestamp', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
  });
});