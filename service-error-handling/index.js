import express from 'express';

const app = express();

app.get('/maybe-error', async (req, res, next) => {
  try {
    if (Math.random() < 0.5) {
      throw new Error('random failure');
    }
    res.json({ ok: true });
  } catch (err) {
    // forward error to the error-handling middleware
    next(err);
  }
});

// centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'internal server error' });
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});