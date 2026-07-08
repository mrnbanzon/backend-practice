import crypto from 'crypto';

// mock DB

// mock users collection
const users = new Map();

const johnID = crypto.randomUUID();
users.set(johnID, {
  id: johnID,
  username: 'john',
  email: 'john@example.com',
  createdAt: new Date().toISOString(),
});

const bobID = crypto.randomUUID();
users.set(bobID, {
  id: bobID,
  username: 'bob',
  email: 'bob@example.com',
  createdAt: new Date().toISOString(),
});

const charlieID = crypto.randomUUID();
users.set(charlieID, {
  id: charlieID,
  username: 'charlie',
  email: 'charlie@example.com',
  createdAt: new Date().toISOString(),
});

export { users };