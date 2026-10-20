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

describe('admin integration tests', () => {
  test('should return list of all users if request has correct permissions', async () => {
    const adminUser = await User.create({
      name: 'TestUser',
      email: 'test@example.com',
      password: 'password123',
      role: 'admin'
    });

    const { accessToken } = tokenUtil.generateTokens(adminUser._id);

    const app = createApp();
    const response = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('users');
  });
});