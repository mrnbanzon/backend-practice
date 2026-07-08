import express from 'express';

const router = express.Router();

router.get('/:username', (req, res, next) => {
  const { username } = req.params;
  res.json({
    message: `Profile info for user: ${username}`,
    user: {
      username,
    },
  });
});

export default router;