import User from '../models/user.model.js';
import * as tokenUtil from '../utils/token.js';

export const registerUser = async (data) => {
  const user = await User.create(data);
  const tokens = tokenUtil.generateTokens(user._id);
  
  return { 
    user: {
      _id: user._id,
      email: user.email,
      name: user.name
    },
    tokens
  };
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
  
  return { 
    user: {
      _id: user._id,
      email: user.email,
      name: user.name
    },
    tokens
  };
};

export const refreshTokens = async (refreshToken) => {
  const payload = tokenUtil.verifyRefreshToken(refreshToken);
  const tokens = tokenUtil.generateTokens(payload.sub);
  return tokens;
}
