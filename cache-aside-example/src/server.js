import './db/mongo.js';

import express from 'express';
import routes from './routes.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/v1', routes);

app.listen(PORT, () => {
  console.log('cache-aside-example server is running on port', PORT);
});