import express from 'express';

import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';

import errorHandler from './middleware/error.js';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 4000, () => {
  console.log(`auth-api listening on port ${process.env.PORT || 4000}`);
});