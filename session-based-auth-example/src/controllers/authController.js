import crypto from 'crypto';
import { hashPassword, verifyPassword } from '../utils/password.js';

import users from '../repositories/users.js';

const registerUser = async (req, res, next) => {
  const { email, password, roles = ['user'] } = req.body;
  const id = crypto.randomUUID();

  const passwordHash = await hashPassword(password);

  users.set(id, {
    id,
    email,
    passwordHash,
    roles,
    createdAt: new Date().toISOString(),
  });

  res.status(201).json({
    id,
    email,
  });
};

const destroySession = (req, res) => {
  return req.session && req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error clearing session' });
    }

    res.clearCookie('connect.sid');
    return res.status(401).json({ error: 'Invalid credentials' });
  });
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  
  const user = [...users.values()].find((usr) => usr.email === email);
  if (!user) {
    return destroySession(req, res);
  }

  const ok = verifyPassword(user.passwordHash, password);
  if (!ok) {
    return destroySession(req, res);
  }

  req.session.userId = user.id;
  req.session.roles = user.roles;
  return res.send('Logged in successfully.');
};

const logoutUser = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out.' });
    }

    res.clearCookie('connect.sid');
    res.send('Logged out successfully.');
  });
};

export default {
  registerUser,
  loginUser,
  logoutUser
}