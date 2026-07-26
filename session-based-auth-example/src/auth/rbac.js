const requiredRole = (role) => {
  return (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!req.session.roles || !req.session.roles.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  }
};

export default requiredRole;