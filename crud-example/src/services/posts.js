import crypto from 'crypto';

import { posts } from '../database/connection.js';

const create = (data) => {
  const { author, message } = data;
  const id = crypto.randomUUID();

  const post = {
    id,
    author,
    message,
    createdAt: new Date().toISOString(),
  };

  posts.set(id, post);
  return post;
};

const fetch = (id) => {
  const post = posts.get(id);
  if (!post) {
    throw {
      status: 404,
      message: 'Post not found',
    };
  }

  return post;
};

const fetchAll = (limit = 5, offset = 0) => {
  const all = [...posts.values()].slice(offset, offset + limit);
  return all;
};

// basic idea of using a cursor in fetching a list of items
const fetchAllCursor = (limit, cursor) => {
  const crsr = cursor ? JSON.parse(Buffer.from(cursor, 'base64').toString()) : null;
  let filtered = [...posts.values()];

  if (crsr) {
    filtered = filtered.filter(post => post.createdAt > new Date(crsr.createdAt));
  }

  filtered = filtered.slice(0, limit);
  const nextCursor = filtered.length
    ? Buffer.from(JSON.stringify({ createdAt: filtered[filtered.length - 1].createdAt })).toString('base64')
    : null;

  return {
    posts: filtered,
    nextCursor,
  };
};

const update = (id, data) => {
  const post = fetch(id);

  const {
    author = post.author,
    message = post.message
  } = data;
  const update = {
    ...post,
    author,
    message,
    updatedAt: new Date().toISOString(),
  };

  posts.set(id, update);
  return update;
};

const remove = (id) => {
  posts.delete(id);
};

export default {
  create,
  fetch,
  fetchAll,
  fetchAllCursor,
  update,
  remove,
};