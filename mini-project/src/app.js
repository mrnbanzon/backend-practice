import express from 'express';

const app = express();

app.get('/health', (req, res, next) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

export default app;