import express from "express";

import requestLog from './middleware/requestLog.js';

import helloRoutes from './routes/hello.mjs';
import userRoutes from './routes/users.mjs';
import postRoutes from './routes/posts.mjs';

const app = express();

// import and use basic middleware
app.use(requestLog);

// mounting routers
app.use('/', helloRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});