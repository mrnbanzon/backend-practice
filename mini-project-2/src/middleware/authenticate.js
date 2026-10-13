import User from '../models/user.model.js';
import * as tokenUtil from '../utils/token.util.js';

export default async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const payload = tokenUtil.verifyAccess(token);
    req.user = await User.findById(payload.sub);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' }); 
  } 
};