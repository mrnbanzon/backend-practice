import express from "express";

const app = express();

// basic route
app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

// start server
app.listen(3000, () => {
  console.log('serving listening on port 3000');
});