import crypto from 'crypto';

// mock DB

// mock posts collection
const posts = new Map();

const id1 = crypto.randomUUID();
posts.set(id1, {
  id: id1,
  author: 'jon',
  message: 'test1',
  createdAt: new Date('2026-07-01'),
});

const id2 = crypto.randomUUID();
posts.set(id2, {
  id: id2,
  author: 'jack',
  message: 'test2',
  createdAt: new Date('2026-07-02'),
});

const id3 = crypto.randomUUID();
posts.set(id3, {
  id: id3,
  author: 'jane',
  message: 'test3',
  createdAt: new Date('2026-07-03'),
});

const id4 = crypto.randomUUID();
posts.set(id4, {
  id: id4,
  author: 'ron',
  message: 'test4',
  createdAt: new Date('2026-07-04'),
});

const id5 = crypto.randomUUID();
posts.set(id5, {
  id: id5,
  author: 'kyle',
  message: 'test5',
  createdAt: new Date('2026-07-05'),
});

const id6 = crypto.randomUUID();
posts.set(id6, {
  id: id6,
  author: 'matt',
  message: 'test6',
  createdAt: new Date('2026-07-06'),
});

const id7 = crypto.randomUUID();
posts.set(id7, {
  id: id7,
  author: 'brandon',
  message: 'test7',
  createdAt: new Date('2026-07-07'),
});

export { posts };