import express from 'express';

import errorHandler from './middleware/errorHandler.js';

import postRoutes from './routes/posts.js';
import postCursorRoutes from './routes/posts-cursor.js';

const app = express();

app.use(express.json());

app.use('/posts', postRoutes);
app.use('/posts-cursor', postCursorRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('basic crud server listening on port 3000');
});