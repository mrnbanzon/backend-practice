import './db/mongo.js';

import express from 'express';
import compression from 'compression';

import routes from './routes.js';
import rateLimiterMiddleware from './middleware/rateLimiter.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(compression());

app.use(rateLimiterMiddleware);
app.use('/v1', routes);

app.listen(PORT, () => {
  console.log('cache-aside-example server is running on port', PORT);
});