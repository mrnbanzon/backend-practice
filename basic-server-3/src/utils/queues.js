import { Queue } from 'bullmq';
import { bullMQConnection as connection } from './redisClient.js';

// create 'refresh-cache' queue
const refreshCacheQueue = new Queue('refresh-cache', {
  connection,
  defaultJobOptions: {
    removeOnComplete: true,
  }
});

// run refresh periodically
await refreshCacheQueue.upsertJobScheduler('refresh-scheduler',
  { every: 60 * 1 * 1000 },
  {
    name: 'periodic-cache-refresh'
  }
);

export {
  refreshCacheQueue
};