const getAllPosts = (req, res, next) => {
  res.send('All posts');
};

const createPost = (req, res, next) => {
  res.send('Post created');
};

export {
  getAllPosts,
  createPost,
};