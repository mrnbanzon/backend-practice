import postsRepo from '../repositories/postsRepo.js';

const postService = (postsRepo) => {
  const createPost = async (data) => {
    return await postsRepo.createPost(data);
  };

  const getPostById = async (id) => {
    return await postsRepo.getPostById(id);
  };

  const updatePost = async (id, data) => {
    return await postsRepo.updatePost(id, data);
  };

  const deletePost = async (id) => {
    return await postsRepo.deletePost(id);
  };

  return {
    createPost,
    getPostById,
    updatePost,
    deletePost,
  };
};

export default postService(postsRepo);