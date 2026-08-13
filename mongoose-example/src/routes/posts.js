import express from 'express';

import postsController from '../controllers/posts.js';

const router = express.Router();

router.route('/')
  .post(postsController.createPost);

router.route('/:id')
  .get(postsController.getPostById)
  .put(postsController.updatePost)
  .delete(postsController.deletePost);

export default router;