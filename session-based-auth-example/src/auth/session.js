import { RedisStore } from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';

const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'session-example:',
});

const sessionMiddleware = session({
  store: redisStore,
  secret: process.env.SESSION_SECRET || 'dev_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  }
});

export default sessionMiddleware;