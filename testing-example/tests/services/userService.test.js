import { jest, describe, test, expect } from '@jest/globals';

import { createUserService } from '../../src/services/userService.js';

describe('userService.createUser', () => {
  test('should create a user when data valid and email not taken', async () => {
    const mockUserRepo = {
      findByEmail: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 1, username: 'mike', email: 'mike@example.com' })
    };

    const mockPasswordHasher = {
      hash: jest.fn().mockResolvedValue('hashedpassword')
    };

    const userService = createUserService({ userRepo: mockUserRepo, passwordHasher: mockPasswordHasher });

    const user = await userService.createUser({ username: 'mike', email: 'mike@example.com', password: 'password' });

    expect(user).toEqual({ id: 1, username: 'mike', email: 'mike@example.com' });
    expect(mockPasswordHasher.hash).toHaveBeenCalledWith('password');
    expect(mockUserRepo.create).toHaveBeenCalledWith({ username: 'mike', email: 'mike@example.com', passwordHash: 'hashedpassword' });
  });
});