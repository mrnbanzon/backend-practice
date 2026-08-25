await import('./db/mongo.js');
await import('./utils/redisClient.js');

import express from 'express';

import productRoutes from './routes/productRoutes.js';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use('/v1/products', productRoutes);

app.listen(PORT, () => {
  console.log(`basic-server-3 is listening on port ${PORT}`);
});