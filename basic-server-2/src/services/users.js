import users from '../repositories/users.js';

const create = async (user) => {
  const newUser = await users.create(user);
  return newUser;
};

const findById = async (id) => {
  const user = await users.findById(id);

  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  return user;
};

const update = async (id, user) => {
  const update = await users.update(id, user);
  return user;
};

const remove = async (id) => {
  await users.remove(id);
  return true;
};

export default {
  create,
  findById,
  update,
  remove,
};