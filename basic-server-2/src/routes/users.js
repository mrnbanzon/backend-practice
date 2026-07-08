import express from 'express';

import usersController from '../controller/users.js';

const router = express.Router();

router.route('/')
  .post(usersController.createUser);

router.route('/:id')
  .get(usersController.getUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);
  
export default router;