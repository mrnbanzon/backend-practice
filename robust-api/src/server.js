import express from 'express';

import { metricsMiddleware, metricsEndpoint } from './metrics.js';

import uploadRoute from './routes/upload.js';

import { createUserController } from './controllers/userController.js';
import { createUserService } from './services/userService.js';
import { createUserRepo } from './repos/userRepo.js';

import logger from './utils/logger.js';
import { bcryptHasher } from './utils/hashers.js';

import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

// note: mount metrics route behind auth in prod for monitoring system
app.get('/metrics', metricsEndpoint());

app.use(metricsMiddleware());

const userRepo = createUserRepo(); // repo handles reading/storing to DB

const userService = createUserService({
  userRepo,
  passwordHasher: bcryptHasher,
});

const createUser = createUserController(userService);

app.post('/users', createUser);

app.use('/upload', uploadRoute);

app.use(errorHandler);

app.listen(3000, () => {
  logger.info('server listening on port 3000');
});
