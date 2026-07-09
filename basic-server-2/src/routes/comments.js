import express from 'express';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  const { postId } = req.params;
  res.json({
    post: postId,
    comments: [],
  });
});

export default router;