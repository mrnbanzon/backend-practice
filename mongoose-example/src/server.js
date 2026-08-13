import './db/mongo.js';

import express from 'express';

import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

import mongooseErrorHandler from './middleware/mongooseErrorHandler.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.use(mongooseErrorHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});