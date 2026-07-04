import express from "express";

import userRoutes from './routes/userRoutes.mjs';

const app = express();

// basic middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// basic route
app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

// basic routing patterns
app.get('/hello', (req, res, next) => {
  res.send('Hello there!');
});

// - using query parameters
app.get('/search', (req, res, next) => {
  res.json({
    query: req.query.q,
  });
});

// mounting a router
app.use('/users', userRoutes);

// start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});