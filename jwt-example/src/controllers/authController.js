import crypto from 'crypto';

import { signAccess, signRefresh, verifyRefresh } from "../auth/jwt.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

// Mock User Collection
const users = new Map(); // id -> { id, email, passwordHash, createdAt }

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const id = crypto.randomUUID();

  const hash = await hashPassword(password);
  
  users.set(id, {
    id,
    email,
    passwordHash: hash,
    createdAt: new Date().toISOString(),
  });

  res.status(201).json({ id, email });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = [...users.values()].find((usr) => usr.email === email);

  if (!user) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  const ok = await verifyPassword(user.passwordHash, password);

  if (!ok) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  const accessToken = signAccess({ sub: user.id });
  const refreshToken = signRefresh({
    sub: user.id,
    rid: `${user.id}:${Date.now()}`
  });

  // sending refresh token as httpOnly secure cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
  });

  res.json({ accessToken });
};

const refreshAccess = async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ error: 'no refresh token' });
  }

  try {
    const payload = verifyRefresh(token);
    console.log(`refresh token payload - ${JSON.stringify(payload)}`);
    
    // check if you need to rotate/revoke refresh token

    const newAccess = signAccess({ sub: payload.sub });
    res.json({ accessToken: newAccess });
  } catch (err) {
    return res.status(401).json({ error: 'invalid refresh token' });
  }
};

export default {
  registerUser,
  loginUser,
  refreshAccess,
}