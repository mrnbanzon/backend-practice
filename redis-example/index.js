import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

(async () => {
  await client.connect();

  // set/get example
  await client.set('greeting', 'Hello Redis!', { EX: 60 }); // expires in 60 seconds
  const greeting = await client.get('greeting');
  console.log(greeting); // Output: Hello Redis!

  await client.quit();
})();