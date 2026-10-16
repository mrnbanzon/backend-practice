import { beforeAll, afterEach, afterAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';

import createApp from '../../src/app.js';

import { connect, clearDatabase, closeDatabase } from './dbHandler.js';

beforeAll(async () => {
  await connect();
  await import('../../src/models/user.model.js');
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('authentication integration tests', () => {
  test('should register a new user and return auth tokens', async () => {
    
    console.log('testing jest configuration');
    expect(true).toBe(true);
    const app = createApp();

    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'testuser', email: 'mike@example.com', password: 'password' })
      .expect(201);

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('tokens');
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user).toHaveProperty('email', 'mike@example.com');
  });
});