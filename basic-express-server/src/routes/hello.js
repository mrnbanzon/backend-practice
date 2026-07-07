import express from 'express';

import {
  helloWorld,
  helloThere,
  search,
  welcome,
} from '../controllers/helloController.js';

const router = express.Router();

router.route('/')
  .get(helloWorld);

router.route('/hello')
  .get(helloThere);

router.route('/search')
  .get(search);

router.route('/welcome')
  .get(welcome);

export default router;