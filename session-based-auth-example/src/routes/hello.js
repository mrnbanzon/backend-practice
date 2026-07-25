import express from 'express';

import helloController from '../controllers/helloController.js';

import sessionMiddleware from '../auth/session.js';

const router = express.Router();

router.use(sessionMiddleware);

router.route('/')
  .get(helloController.hello);

export default router;