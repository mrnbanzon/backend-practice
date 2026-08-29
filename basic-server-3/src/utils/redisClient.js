import { createClient } from 'redis';
import { createNodeRedisClient } from 'bullmq';

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redis.on('connect', () => {
  console.log('Connected to Redis Server');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

await redis.connect();

const bullMQConnection = createNodeRedisClient(redis);

export  {
  redis,
  bullMQConnection,
};