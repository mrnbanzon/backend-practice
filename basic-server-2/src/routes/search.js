import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  const { q, page = 1 } = req.query;

  res.json({
    query: q || 'none',
    page: Number(page),
    tips: 'Try ?q=javascript&page=2 to see query params in action!',
  });
});

export default router;