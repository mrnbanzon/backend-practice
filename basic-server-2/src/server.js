import express from 'express';

import userRoutes from './routes/users.js';

const app = express();

// adding a home route
app.get('/', (req, res, next) => {
  res.send('Welcome to basic-server-2!');
});

// mounting user routes under /users path
app.use('/users', userRoutes);

// adding a users route that reads query parameters
app.get('/search', (req, res, next) => {
  const { q, page = 1 } = req.query;

  res.json({
    query: q || 'none',
    page: Number(page),
    tips: 'Try ?q=javascript&page=2 to see query params in action!',
  });
});

// adding a simple JSON api endpoint
app.get('/api/info', (req, res, next) => {
  res.json({
    app: 'Basic Express Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.listen(3000, () => {
  console.log('basic-server-2 is listening on port 3000');
});