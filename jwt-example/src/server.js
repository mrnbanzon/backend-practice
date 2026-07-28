import express from 'express';

import authRoutes from './routes/auth.js';
import helloRoutes from './routes/hello.js';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/hello', helloRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`JWT server listening on port ${process.env.PORT || 3000}`);
});