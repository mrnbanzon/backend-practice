import express from 'express';

import authenticate from '../middlewares/auth.middleware.js';
import allowRoles from '../middlewares/rbac.middleware.js';

const router = express.Router();

router.route('/users')
  .get(authenticate, allowRoles('admin'), (req, res, next) => {
    // logic to get all users
    res.send('Get all users');
  });

export default router;