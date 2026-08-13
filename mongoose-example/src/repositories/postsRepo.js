import Post from '../models/posts.js';

const createPost = async (data) => {
  const { title, body, tags, author } = data;
  const post = new Post({ title, body, tags, author });
  return await post.save();
};

const getPostById = async (id) => {
  return await Post.findById(id).populate('author', 'username email').exec();
};

const updatePost = async (id, data) => {
  const { title, body, published } = data;
  const post = await Post.findById(id);
  if (!post) {
    return null;
  }
  post.title = title !== undefined ? title : post.title;
  post.body = body !== undefined ? body : post.body;
  post.published = published !== undefined ? published : post.published;
  await post.save();

  return await post.populate('author', 'username email');
};

const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

export default {
  createPost,
  getPostById,
  updatePost,
  deletePost,
};