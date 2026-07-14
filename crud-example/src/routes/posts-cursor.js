import express from 'express';

import postsController from '../controllers/posts.js';

const router = express.Router();

router.route('/')
  .get(postsController.fetchAllCursor) // get all posts - basic cursor pattern

export default router;