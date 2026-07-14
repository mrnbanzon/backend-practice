import crypto from 'crypto';

// mock DB collection
const posts = new Map();

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

const fetchAll = () => {
  const all = [...posts.values()];
  return all;
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
  update,
  remove,
};