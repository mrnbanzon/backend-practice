import { Router } from 'express';

import userController from '../controllers/userController.js';

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.listUsers);

export default router;