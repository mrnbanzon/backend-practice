import express from 'express';

const router = express.Router();

router.route('/')
  .get((req, res, next) => {
    res.send('Welcome to resources API v2!');
  });

export default router;