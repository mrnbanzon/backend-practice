import { redis } from '../../cache/redisClient.js';

import { fetchPosts } from './posts.service.js';

const getPosts = async (req, res, next) => {
  try {
    const { limit = 5, cursor = '' } = req.query;

    // consider moving caching logic to service layer
    const cacheKey = `posts:cursor:${cursor}limit:${limit}`;

    const cached = await redis.get(cacheKey);

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // cache-miss fetch from db
    const result = await fetchPosts({ cursor, limit: Number(limit) });

    // cache result fetched from db in redis (stringify)
    await redis.set(cacheKey, JSON.stringify(result), 60); // expire: 1 min

    return res.json(result);
  } catch (err) {
    next(err);
  }
};

export { getPosts };