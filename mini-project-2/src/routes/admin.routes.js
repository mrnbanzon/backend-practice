import express from 'express';

import authenticate from '../middleware/authenticate.js';
import allowRoles from '../middleware/rbac.js';

import * as adminController from '../controllers/admin.controller.js';

const router = express.Router();

router.route('/users')
  .get(authenticate, allowRoles('admin'), adminController.getAllUsers);

export default router;