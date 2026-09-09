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

  test('should throw 400 error when missing required fields', async () => {
    const mockUserRepo = {
      findByEmail: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
    };

    const passwordHasher = {
      hash: jest.fn(),
    };

    const userService = createUserService({ userRepo: mockUserRepo, passwordHasher });

    const testCases = [
      { username: '', email: 'mike@example.com', password: 'password' },
      { username: 'mike', email: '', password: 'password' },
      { username: 'mike', email: 'mike@example.com', password: '' }
    ];

    for (const testCase of testCases) {
      await expect(userService.createUser(testCase))
        .rejects.toMatchObject({ message: 'Missing required fields', status: 400 });
    } 
  });

   test('should throw 409 error when email exists', async () => {
    const mockUserRepo = {
      findByEmail: jest.fn().mockResolvedValue({ id: 1, username: 'mike', email: 'mike@example.com' }),
    };

    const mockPasswordHasher = {
      hash: jest.fn(),
    };

    const userService = createUserService({ userRepo: mockUserRepo, passwordHasher: mockPasswordHasher });

    await expect(userService.createUser({ username: 'mike', email: 'mike@example.com', password: 'passowrd' }))
      .rejects.toMatchObject({ message: 'User with email already exists', status: 409 });
  });
});