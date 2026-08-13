import express from 'express';

import userController from '../controllers/users.js';

const router = express.Router();

router.route('/')
  .post(userController.createUser);

router.route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;