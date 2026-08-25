import { Queue } from 'bullmq';

import { redis } from './redisClient.js';

// create 'send-emails' queue
const sendEmailsQueue = new Queue('send-emails', {
  connection: redis,
  defaultJobOptions: {
    removeOnComplete: true,
  }
});

// add job to the send emails queue
await sendEmailsQueue.add('welcome', { user: '123' });