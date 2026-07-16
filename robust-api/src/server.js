import express from 'express';


import { createUserController } from './controllers/userController.js';
import { createUserService } from './services/userService.js';
import { createUserRepo } from './repos/userRepo.js';

import { bcryptHasher } from './utils/hashers.js';

import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

const userRepo = createUserRepo(); // repo handles reading/storing to DB

const userService = createUserService({
  userRepo,
  passwordHasher: bcryptHasher,
});

const createUser = createUserController(userService);

app.post('/users', createUser);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
