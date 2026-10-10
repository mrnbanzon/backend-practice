import User from '../models/user.model.js';
import * as tokenUtil from '../utils/token.util.js';

export const registerUser = async (data) => {
  const user = await User.create(data);
  const tokens = tokenUtil.generateTokens(user._id);
  return { user, tokens };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    throw new Error('Invalid credentials');
  }

  const tokens = tokenUtil.generateTokens(user._id);
  return { user, tokens }; // consider filterting out password before returning user object
};

