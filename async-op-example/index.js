import express from 'express';


const app = express();

// asnyc non-blocking simulation
app.get('/async-task', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate I/O operation
  res.send({ ok: true });
});

// blocking CPU-bound operation
app.get('/cpu-task', (req, res) => {
  // naive prime check - deliberately slow for demo
  const isPrime = (num) => {
    if (num < 2) {
      console.log(`${num} is less than 2, not prime`);
      return false;
    }

    for (let i = 2; i <= (num); i++) {
      console.log(`Checking ${num} against ${i}`);
      if (num !==i && num % i === 0) {
        console.log(`${num} is divisible by ${i}, not prime`);
        return false;
      }
    }

    console.log(`${num} is prime`);
    return true;
  };

  const result = isPrime(319993); // large prime number, CPU intensive
  res.json({ prime: result });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});