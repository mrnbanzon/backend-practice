import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Welcome to basic-server-2!');
});

export default router;