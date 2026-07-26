import express from 'express';

import helloController from '../controllers/helloController.js';

import sessionMiddleware from '../auth/session.js';
import requiredRole from '../auth/rbac.js'

const router = express.Router();

router.use(sessionMiddleware);

router.route('/admin')
  .all(requiredRole('admin'))
  .get(helloController.hello);

router.route('/')
  .all(requiredRole('user'))
  .get(helloController.hello);

export default router;