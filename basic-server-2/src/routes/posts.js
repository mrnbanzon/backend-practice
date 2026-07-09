import express from 'express';

import commentsRoutes from './comments.js';

const router = express.Router();

router.use('/:postId/comments', commentsRoutes);

export default router;