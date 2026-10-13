import express from 'express';

import authenticate from '../middlewares/auth.middleware.js';
import allowRoles from '../middlewares/rbac.middleware.js';

import * as adminController from '../controllers/admin.controller.js';

const router = express.Router();

router.route('/users')
  .get(authenticate, allowRoles('admin'), adminController.getAllUsers);

export default router;