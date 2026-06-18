import express from 'express';
import {
  Worker,
  isMainThread,
  parentPort,
  workerData
} from 'node:worker_threads';

const currentFile = import.meta.filename;

// naive prime check - deliberately slow for demo
const isPrime = (num) => {
  if (num < 2) {
    console.log(`${num} is less than 2, not prime`);
    return false;
  }

  for (let i = 2; i <= (num); i++) {
    // console.log(`Checking ${num} against ${i}`);
    if (num !==i && num % i === 0) {
      console.log(`${num} is divisible by ${i}, not prime`);
      return false;
    }
  }

  console.log(`${num} is prime`);
  return true;
};

if (!isMainThread) {
  console.log('Worker thread started, performing CPU-intensive task...');
  const result = isPrime(319993); // large prime number, CPU intensive
  parentPort.postMessage(result);
  process.exit(0); // Ensure worker exits after task is done
}

const app = express();

// asnyc non-blocking simulation
app.get('/async-task', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate I/O operation
  res.send({ ok: true });
});

// blocking CPU-bound operation - REFACTORED to use worker thread ( example )
app.get('/cpu-task', (req, res) => {
  if (isMainThread) {
    console.log('Main thread received request, offloading to worker thread...');
    const worker = new Worker(currentFile, { workerData: null });
    worker.on('message', (result) => {
      return res.json({ prime: result });
    });
    worker.on('error', (err) => {
      console.error('Worker error:', err);
      return res.status(500).json({ error: 'Worker error' });
    });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});