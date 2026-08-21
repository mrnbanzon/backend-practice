import { redis } from "../cache/redisClient.js";
import { RateLimiterRedis } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'middleware',
  points: 10, // 10 requests - example; production should be higher throughput
  duration: 60, // per 60 seconds
  useRedisPackage: true, // set flag for 'redis' package
})

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (err) {
    res.status(429).json({ error: 'Too Many Requests' });
  }
};

export default rateLimiterMiddleware;