import { beforeAll, afterEach, afterAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';

import createApp from '../../src/app.js';
import * as tokenUtil from '../../src/utils/token.js';

import User from '../../src/models/user.model.js';

import { connect, clearDatabase, closeDatabase } from './dbHandler.js';

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('authentication integration tests', () => {
  test('should register a new user and return auth tokens', async () => {
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

  describe('login and refresh token flow', () => {
    beforeEach(async () => {
      await User.create({ name: 'testuser', email: 'mike@example.com', password: 'password' });
    });

    test('should login existing user and return auth tokens', async () => {
      const app = createApp();
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'mike@example.com', password: 'password' })
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('tokens');
      expect(response.body.user).toHaveProperty('_id');
      expect(response.body.user).toHaveProperty('email', 'mike@example.com');
    });

    test('should refresh tokens with valid refresh token', async () => {
      const { refreshToken } = tokenUtil.generateTokens('__test_id__');

      const app = createApp();
      const response = await request(app)
        .post('/auth/refresh')
        .send({ refreshToken })
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });
  });
});