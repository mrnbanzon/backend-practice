import express from 'express';
import cookieParser from 'cookie-parser';

import authController from '../controllers/authController.js';

const router = express.Router();
router.use(cookieParser());

router.route('/register')
  .post(authController.registerUser);

router.route('/login')
  .post(authController.loginUser);

router.route('/refresh')
  .post(authController.refreshAccess);

export default router;