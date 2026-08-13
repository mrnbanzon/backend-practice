import userRepo from '../repositories/userRepo.js';

const userService = (userRepo) => {
  const createUser = async (data) => {
    const { password, ...rest } = data;
    return await userRepo.createUser({ ...rest, passwordHash: password });
  };

  const getUserById = async (id) => {
    return await userRepo.getUserById(id);
  };

  const updateUser = async (id, data) => {
    const { password, ...rest } = data;
    return await userRepo.updateUser(id, rest);
  };

  const deleteUser = async (id) => {
    return await userRepo.deleteUser(id);
  };

  return {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
  };
};

export default userService(userRepo);