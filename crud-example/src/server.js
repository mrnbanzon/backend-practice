import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { apiReference } from '@scalar/express-api-reference';
import yaml from 'yamljs';

import errorHandler from './middleware/errorHandler.js';

import postRoutes from './routes/posts.js';
import postCursorRoutes from './routes/posts-cursor.js';

const app = express();

app.enable('trust proxy');

app.use(cors({ origin: 'http://localhost' }));
app.use(helmet());

app.use(express.json());

app.use('/posts', postRoutes);
app.use('/posts-cursor', postCursorRoutes);

// serve api docs via endpoint - formatted via scalar
const docsRouteCSP = helmet.contentSecurityPolicy({
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    // Allow scripts and stylesheets from the Scalar CDN
    "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
    "style-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
  },
});

const openApiSpec = yaml.load('./openapi.yaml');

app.use('/docs', docsRouteCSP, apiReference({
  spec: {
    content: openApiSpec
  },
}));

app.use(errorHandler);

app.listen(3000, () => {
  console.log('basic crud server listening on port 3000');
});