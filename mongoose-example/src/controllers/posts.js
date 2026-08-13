import postsService from '../services/postService.js';

const createPost = async (req, res, next) => {
  const post = await postsService.createPost(req.body);
  res.status(201).json(post);
};

const getPostById = async (req, res) => {
  const post = await postsService.getPostById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
};

const updatePost = async (req, res) => {
  const post = await postsService.updatePost(req.params.id, req.body);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
};

const deletePost = async (req, res) => {
  const post = await postsService.deletePost(req.params.id);
  res.status(204).send();
};

export default {
  createPost,
  getPostById,
  updatePost,
  deletePost,
};