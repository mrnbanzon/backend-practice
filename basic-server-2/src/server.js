import express from 'express';

import requestLog from './middleware/requestLog.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

import homeRoutes from './routes/home.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import searchRoutes from './routes/search.js';
import apiRoutes from './routes/api.js';

const app = express();

// parse json request body
app.use(express.json());

// middleware for logging requests
app.use(requestLog);

// mounting routes
app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/search', searchRoutes);
app.use('/api', apiRoutes);

// adding error handler
app.use(errorHandler);

// adding 404 error handler for unmatched routes
app.use(notFound);

app.listen(3000, () => {
  console.log('basic-server-2 is listening on port 3000');
});