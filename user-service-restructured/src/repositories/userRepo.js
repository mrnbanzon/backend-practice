import crypto from 'crypto';

import { users } from '../database/connection.js';

const create = async (user) => {
  const { username, email } = user;

  const id = crypto.randomUUID();
  const newUser = { id, username, email, createdAt: new Date().toISOString() };

  users.set(id, newUser);

  return newUser;
};

const findById = async (id) => {
  return users.get(id);
};

const findByEmail = async (email) => {
  return [...users.values()].find(u => u.email === email);
};

const list = async () => {
  return [...users.values()];
};

const update = async (id, user) => {
  const existing = users.get(id);

  if (!existing) {
    throw { status: 404, message: 'User not found' };
  }

  const { email } = user;

  const update = {
    ...existing,
    email,
    updatedAt: new Date().toISOString(),
  };

  users.set(id, update);
  return update;
};

export default {
  create,
  findById,
  findByEmail,
  list,
  update,
};