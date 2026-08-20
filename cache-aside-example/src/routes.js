import express from 'express';
import { postsRoutes } from './modules/posts/index.js';

const router = express.Router();

router.use('/posts', postsRoutes);

export default router;