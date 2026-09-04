import User from '../../shared/models/users.js';

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getUserById = async (id) => {
  return await User.findById(id).lean();
};

const updateUser = async (id, update) => {
  return await User.findByIdAndUpdate(id, update, { returnDocument: 'after', runValidators: true }).lean();
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id).lean();
};

export default {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
}