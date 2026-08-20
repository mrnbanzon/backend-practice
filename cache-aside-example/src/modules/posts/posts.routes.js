import express from 'express';
import { getPosts } from './posts.controller.js';

const router = express.Router();

router.route('/')
  .get(getPosts);

export default router;