import express from 'express';

import bodyParser from 'body-parser';
import crypto from 'crypto';

const app = express();
app.use(bodyParser.json());

// users hash
const users = new Map();

// Create Users endpoint
app.post('/users', (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: 'username and email required' });
  }

  const id = crypto.randomUUID();
  const user = { id, username, email, createdAt: new Date().toISOString() };

  users.set(id, user);

  res.status(201).json(user);
});

// List Users endpoint
app.get('/users', (req, res) => {
  res.json(Array.from(users.values()));
});

app.listen(3000, () => console.log('User service running on http://localhost:3000'));