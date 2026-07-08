import crypto from 'crypto';

import { users } from '../database/connection.js';

const create = (user) => {
  const { username, email } = user;

  const userId = crypto.randomUUID();
  const newUser = {
    id: userId,
    username,
    email,
    createdAt: new Date().toISOString(),
  };

  users.set(userId, newUser);
  return newUser;
};

const findById = async (id) => {
  return users.get(id);
};

const update = async (id, user) => {
  const existing = await findUserById(id);

  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  const { username, email } = user;

  const update = {
    ...existing,
    username,
    email,
    updatedAt: new Date().toISOString(),
  };

  users.set(id, update);
  return update;
};

const remove = async (id) => {
  users.delete(id);
};


export default {
  create,
  findById,
  update,
  remove,
}
