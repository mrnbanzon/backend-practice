import express from 'express';
import crypto from 'crypto';

const app = express();

app.use(express.json());

// mock data
const users = new Map();

// create returns the canonical representation of the user
app.post('/users', (req, res, next) => {
  const id = crypto.randomUUID();
  const { username, email } = req.body;

  const user = {
    id,
    username,
    email,
    createdAt: new Date().toISOString(),
  };

  users.set(id, user);
  res.status(201).json(user);
});


// fetch returns that same representation 
app.get('/users/:id', (req, res, next) => {
  const user = users.get(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});