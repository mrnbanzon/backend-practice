import assert from 'assert';

const get = (key, fallback) => {
  return process.env[key] || fallback;
};

const PORT = Number(get('PORT', 4000));
const NODE_ENV = get('NODE_ENV', 'development');
const isProd = NODE_ENV === 'production';

const DB_URL = get('MONGO_URI', 'mongodb://localhost:27017/basic_server_3_db');
const REDIS_URL = get('REDIS_URL', 'redis://localhost:6379');



const required = (key) => {
  const val = process.env[key];
  assert(val, `Missing required env var: ${key}`);
  return val;
};

const fakeSecret = required('ACCESS_SECRET'); // fail immediately if not provided


export {
  PORT,
  NODE_ENV,
  isProd,
  DB_URL,
  REDIS_URL,
  fakeSecret,
};