import jwt from 'jsonwebtoken';

export const signAccess = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_EXPIRES_IN,
  });
};

export const verifyAccess = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const signRefresh = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES_IN,
  });
};

export const verifyRefresh = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};