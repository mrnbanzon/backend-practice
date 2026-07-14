import express from 'express';

import errorHandler from './middleware/errorHandler.js';

import postRoutes from './routes/posts.js';

const app = express();

app.use(express.json());

app.use('/posts', postRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('basic crud server listening on port 3000');
});