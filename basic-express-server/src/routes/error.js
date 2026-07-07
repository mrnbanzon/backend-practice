import express from 'express';

import {
  syncError,
  asyncError,
} from '../controllers/errorController.js';

const router = express.Router();

router.route('/sync-error')
  .get(syncError);

router.route('/async-error')
  .get(asyncError);

export default router;