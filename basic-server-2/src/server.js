import express from 'express';

import notFound from './middleware/notFound.js';

import homeRoutes from './routes/home.js';
import userRoutes from './routes/users.js';
import searchRoutes from './routes/search.js';
import apiRoutes from './routes/api.js';

const app = express();

// mounting routes
app.use('/', homeRoutes);
app.use('/users', userRoutes);
app.use('/search', searchRoutes);
app.use('/api', apiRoutes);

// adding 404 error handler for unmatched routes
app.use(notFound);

app.listen(3000, () => {
  console.log('basic-server-2 is listening on port 3000');
});