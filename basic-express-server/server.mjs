import express from "express";

const app = express();

// basic middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// basic route
app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

// start server
app.listen(3000, () => {
  console.log('serving listening on port 3000');
});