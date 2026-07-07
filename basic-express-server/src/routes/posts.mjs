import express from 'express';

import {
  getAllPosts,
  createPost,
} from '../controllers/postController.mjs';

const router = express.Router();

router.route('/')
  .get(getAllPosts)
  .post(createPost);

export default router;