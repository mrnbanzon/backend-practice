import express from 'express';

import authController from '../controllers/authController.js';

import validate from '../middleware/validate.js';

import { registerSchema, loginSchema } from '../utils/schemas.js';

const router = express.Router();

router.route('/register')
  .post(validate(registerSchema), authController.registerUser);

router.route('/login')
  .post(validate(loginSchema), authController.loginUser);

export default router;