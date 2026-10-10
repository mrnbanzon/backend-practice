import express from 'express';

import authRoutes from './routes/auth.routes.js';

const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use('/auth', authRoutes);

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: Date.now() });
  })
  
  return app;
};

export default createApp;