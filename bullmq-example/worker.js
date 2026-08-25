import { Worker } from "bullmq";

import { redis } from './redisClient.js';

// processes the jobs queued in the bull queue 'send-emails'
const processJob = new Worker('send-emails', async (job) => {
  console.log('processing job...', JSON.stringify(job));
}, { 
  connection: redis
});