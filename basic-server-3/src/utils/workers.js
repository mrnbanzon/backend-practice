import { Worker } from "bullmq";
import { redis, bullMQConnection as connection } from "./redisClient.js";

import productService from "../services/productService.js";

const handlePeriodicRefresh = async () => {
  // only refresh cache of filtered list for now
  for await (const keys of redis.scanIterator({
    MATCH: 'basic-server-3:products:filter*',
  })) {
    const keyValRegex = /(?<key>[^:]+):(?<value>[^:]+)/g;
    
    for (const key of keys) {
      const [_prefix, filter] = key.split('filter:');

      const query = Object.fromEntries(
        Array.from(filter.matchAll(keyValRegex), match => [match.groups.key, match.groups.value])
      );

      console.log('key', key, 'query', query);
      const { products, nextCursor } = await productService.fetchProducts(query);
      console.log('products', JSON.stringify(products), 'nextCursor', nextCursor);

      const data = {
        products,
        pagination: {
          hasNext: !!nextCursor,
          nextCursor,
        }
      };

      await redis.set(key, JSON.stringify(data), {
        EX: 60 * 3, // expire in 3 minutes
      });
    }
  }
};

// processes the jobs queued in the refresh cache queue - consider using function currying
const processCacheRefresh = new Worker('refresh-cache', async (job) => {
  console.log('processing job...', job.name, job.id);

  if (job.name === 'periodic-cache-refresh') {
    await handlePeriodicRefresh();
    return;
  }
}, { 
  connection
});

processCacheRefresh.on('completed', (job) => {
  console.log(`Processed Refresh Cache Job ${job.id}`);
});

export { processCacheRefresh };