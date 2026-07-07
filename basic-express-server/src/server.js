import express from "express";

import requestLog from './middleware/requestLog.js';
import errorHandler from './middleware/errorHandler.js';

import helloRoutes from './routes/hello.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

const app = express();

// import and use basic middleware
app.use(requestLog);

// mounting routers
app.use('/', helloRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// use global error handler middleware
app.use(errorHandler);

// start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});