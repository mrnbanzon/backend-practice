import { Router } from 'express';

import userController from '../controllers/userController.js';

const router = Router();

router.route('/')
  .get(userController.listUsers)
  .post(userController.createUser);

router.route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser);

export default router;