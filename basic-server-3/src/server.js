await import('./db/mongo.js');
await import('./utils/redisClient.js');
await import('./utils/queues.js');
await import('./utils/workers.js');

import express from 'express';

import { PORT } from './config.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
app.use(express.json());

app.use('/v1/products', productRoutes);

app.listen(PORT, () => {
  console.log(`basic-server-3 is listening on port ${PORT}`);
});