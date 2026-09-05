import express from 'express';

import connectDB from './shared/db.js';
import logger from './shared/logger.js';

import userRoutes from './modules/users/index.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

await connectDB();

app.use('/v1/users', userRoutes);

app.listen(PORT, () => {
  logger.info(`Modular monolith example server running on port ${PORT}`);
});