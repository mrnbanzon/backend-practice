import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import errorHandler from './middleware/errorHandler.js';

import postRoutes from './routes/posts.js';
import postCursorRoutes from './routes/posts-cursor.js';

const app = express();

app.enable('trust proxy');

app.use(cors({ origin: 'http://localhost' }));
app.use(helmet());

app.use(express.json());

app.use('/posts', postRoutes);
app.use('/posts-cursor', postCursorRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('basic crud server listening on port 3000');
});