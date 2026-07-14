import postsService from '../services/posts.js';

const create = (req, res, next) => {
  const post = postsService.create(req.body);

  res.status(201)
    .location(`/posts/${post.id}`)
    .json(post);
};

const fetch = (req, res, next) => {
  try {
    const post = postsService.fetch(req.params.id);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const fetchAll = (req, res, next) => {
  const allPosts = postsService.fetchAll();
  res.json({
    posts: allPosts,
  });
};

const replace = (req, res, next) => {
  try {
    const update = postsService.update(req.params.id, req.body);
    res.json(update);
  } catch (err) {
    next(err);
  }
};

const update = (req, res, next) => {
  try {
    const update = postsService.update(req.params.id, req.body);
    res.json(update);
  } catch (err) {
    next(err);
  }
};

const remove = (req, res, next) => {
  postsService.remove(req.params.id);
  res.status(204).end();
};

export default {
  create,
  fetch,
  fetchAll,
  replace,
  update,
  remove,
};