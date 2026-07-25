import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'dev_access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'dev_refresh_secret';

export function signAccess(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '10m' });
};

export function verifyAccess(token) {
  return jwt.verify(token, ACCESS_SECRET);
};

export function signRefresh(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
};

export function verifyRefresh(token) {
  return jwt.verify(token, REFRESH_SECRET);
};
