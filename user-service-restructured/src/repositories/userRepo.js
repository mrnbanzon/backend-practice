import crypto from 'crypto';

import { users } from '../database/connection.js';

const create = async (user) => {
  const { username, email } = user;

  const id = crypto.randomUUID();
  const newUser = { id, username, email, createdAt: new Date().toISOString() };

  users.set(id, newUser);

  return newUser;
};

const findByEmail = async (email) => {
  return [...users.values()].find(u => u.email === email);
};

const list = async () => {
  return [...users.values()];
};

export default {
  create,
  findByEmail,
  list
};