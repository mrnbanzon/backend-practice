import express from 'express';
import compression from 'compression';

import requestLog from './middleware/requestLog.js';
import errorHandler from './middleware/errorHandler.js';

import helloRoutes from './routes/hello.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import errorRoutes from './routes/error.js';

const app = express();

// use ejs template engine for rendering views
app.set('view engine', 'ejs');

// import and use basic middleware
app.use(requestLog);

// use compression middleware to enable response compression
app.use(compression());

// mounting routers
app.use('/', helloRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/error', errorRoutes);

// serve static files from the public directory
app.use('/static', express.static('public'));

// use global error handler middleware
app.use(errorHandler);

// start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});