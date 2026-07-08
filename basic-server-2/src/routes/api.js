import express from 'express';

const router = express.Router();

router.get('/info', (req, res, next) => {
  res.json({
    app: 'Basic Express Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

export default router;