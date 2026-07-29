
import argon2 from 'argon2';
import crypto, { sign } from 'crypto';

import users from '../data/users.js';
import { signAccess, signRefresh } from '../auth/jwt.js';

const register = async ({ email, password, role = 'user' }) => {
  const exists = users.find((u) => u.email === email);
  if (exists) {
    throw new Error('Email already in use');
  }

  const hashed = await argon2.hash(password);

  const newUser = {
    id: crypto.randomUUID(),
    email,
    password: hashed,
    role,
  };

  users.push(newUser);

  return {
    id: newUser.id,
    email: newUser.email,
  };
};

const login = async ({ email, password }) => {
  const user = users.find((u)=> u.email === email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const ok = await argon2.verify(user.password, password);
  if (!ok) {
    throw new Error('Invalid credentials');
  }

  const accessToken = signAccess({
    id: user.id,
    role: user.role
  });

  const refreshToken = signRefresh({
    id: user.id,
    role: user.role,
  });

  return { accessToken, refreshToken }
};

export default {
  register,
  login,
};