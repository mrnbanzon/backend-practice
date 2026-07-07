import express from 'express';

import {
  helloWorld,
  helloThere,
  search,
} from '../controllers/helloController.mjs';

const router = express.Router();

router.route('/')
  .get(helloWorld);

router.route('/hello')
  .get(helloThere);

router.route('/search')
  .get(search);

export default router;