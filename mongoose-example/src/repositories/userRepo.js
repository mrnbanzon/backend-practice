import User from '../models/user.js';

const createUser = async (data) => {
  const { username, email, passwordHash, bio } = data;
  const user = new User({ username, email, passwordHash, bio });
  return await user.save();
};

const getUserById = async (id) => {
  return await User.findById(id).lean();
};

const updateUser = async (id, data) => {
  const { username, email, passwordHash, bio } = data;
  // consider using findbyId and save to account for pre-save hooks and validation
  const user = await User.findByIdAndUpdate(id, { username, email, passwordHash, bio }, { returnDocument: 'after', runValidators: true });
  return user;
}

const deleteUser = async (id) => {
  return await User.deleteOne({ _id: id });
};

export default {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};

