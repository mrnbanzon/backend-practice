import express from 'express';

import authController from '../controllers/authController.js';

import sessionMiddleware from '../auth/session.js';

const router = express.Router();

router.route('/register')
  .post(authController.registerUser);

router.use(sessionMiddleware);

router.route('/login')
  .post(authController.loginUser);

router.route('/logout')
  .post(authController.logoutUser);

export default router;