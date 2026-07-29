import { verifyAccess } from "../auth/jwt.js";

export default (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    // assuming the token payload is user info
    req.user = verifyAccess(token);
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token' }); 
  }
};