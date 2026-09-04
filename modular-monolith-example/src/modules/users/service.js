import UserRepo from './repository.js';

const createUser = async (data) => {
  const { username, email, password } = data;
  return await UserRepo.createUser({ username, email, password });
};

const getUserById = async (id) => {
  const user = await UserRepo.getUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUser = async (id, data) => {
  const { username, email } = data;
  const updatedUser = await UserRepo.updateUser(id, { username, email });

  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await UserRepo.deleteUser(id);

  if (!deletedUser) {
    throw new Error('User not found');
  }
  return;
};

export default {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};