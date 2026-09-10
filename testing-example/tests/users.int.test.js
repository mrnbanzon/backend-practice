import { jest, describe, test, expect } from '@jest/globals';
import request from 'supertest';

import { createApp } from '../src/app.js';

describe('POST /users (integration test)', () => {
  test('should create a user when data valid and email not taken', async () => {
    // mock userService
    const mockUserService = {
      createUser: jest.fn().mockResolvedValue({ id: 1, username: 'mike', email: 'mike@example.com' }),
    };

    const app = createApp({ userService: mockUserService });

    const response = await request(app)
      .post('/users')
      .send({ username: 'mike', email: 'mike@example.com', password: 'password' })
      .expect(201);

    expect(response.body).toEqual({ id: 1, username: 'mike', email: 'mike@example.com' });
    expect(mockUserService.createUser).toHaveBeenCalled();
  });
});