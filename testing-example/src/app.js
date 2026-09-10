import express from 'express';

export function createApp({ userService }) {
  const app = express();
  app.use(express.json());

  // create user endpoint
  app.post('/users', async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  });

  // global error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  });

  return app;
};