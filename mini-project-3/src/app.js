import express from 'express';

import productsRoutes from './modules/products/index.js';

const createApp = () => {
  const app = express();
  app.use(express.json());

  app.use('/products', productsRoutes);

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
  });

  return app;
};

export default createApp;