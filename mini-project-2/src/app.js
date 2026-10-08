import express from 'express';

const createApp = () => {
  const app = express();

  app.use(express.json());

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: Date.now() });
  })
  
  return app;
};

export default createApp;