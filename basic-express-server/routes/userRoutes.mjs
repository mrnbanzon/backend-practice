import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('All users');
});

router.get('/:id', (req, res, next) => {
  res.send(`User with ID ${req.params.id}`);
});

export default router;