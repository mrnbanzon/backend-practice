import { verifyAccess } from '../auth/jwt.js';

const authenticateJWT = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'missing authorization' });
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'invalid auth header' });
  }

  try {
    const payload = verifyAccess(token);
    req.user = {
      id: payload.sub, // fetch additional user info here if needed
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid or expired token' });
  }
};

export {
  authenticateJWT,
};