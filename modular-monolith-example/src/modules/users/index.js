import { Router } from 'express';

import UserController from './controller.js';

const router = Router();

router.route('/')
  .post(UserController.createUser)

router.route('/:id')
  .get(UserController.fetchUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser)

export default router;