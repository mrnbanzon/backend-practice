import { Worker } from "bullmq";
import { redis, bullMQConnection as connection } from "./redisClient.js";

const handlePeriodicRefresh = async () => {
  // only refresh cache of filtered list for now
  for await (const keys of redis.scanIterator({
    MATCH: 'basic-server-3:products:filter*',
  })) {
    console.log('matching keys', keys);
    const keyValRegex = /(?<key>[^:]+):(?<value>[^:]+)/g;
    
    for (const key of keys) {
      const [_prefix, filter] = key.split('filter:');

      const query = Object.fromEntries(
        Array.from(filter.matchAll(keyValRegex), match => [match.groups.key, match.groups.value])
      );

      console.log(JSON.stringify(query));
    }
  }
};

// processes the jobs queued in the refresh cache queue
const processCacheRefresh = new Worker('refresh-cache', async (job) => {
  console.log('processing job...', JSON.stringify(job));

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