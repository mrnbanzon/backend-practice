import express from 'express';

import helloController from '../controllers/helloController.js';

import { authenticateJWT } from '../middleware/authenticate.js';

const router = express.Router();

router.use(authenticateJWT);

router.route('/')
  .get(helloController.hello);

export default router;