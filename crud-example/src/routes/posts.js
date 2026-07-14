import express from 'express';

import postsController from '../controllers/posts.js';

const router = express.Router();

router.route('/')
  .get(postsController.fetchAll) // get all posts - basic limit/offset
  .post(postsController.create); // create post

router.route('/:id')
  .get(postsController.fetch) // get single post
  .put(postsController.replace) // replace post
  .patch(postsController.update) // partial update
  .delete(postsController.remove) // remove post

export default router;