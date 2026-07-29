import express from 'express';

import authenticate from '../middleware/auth.js';
import allow from '../middleware/roles.js';

const router = express.Router();

router.route('/secret')
  .get(authenticate, (req, res, next) => {
    res.json({
      message: 'Secret endpoint',
    });
  });

router.route('/admin')
  .get(authenticate, allow('admin'), (req, res, next) => {
    res.json({
      message: 'Admin only endpoint',
    });
  });

export default router;