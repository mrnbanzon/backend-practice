import Post from '../../db/models/posts.js';

const fetchPosts = async ({ cursor = '', limit = 5 }) => {
  console.log(`fetchPosts - cursor: ${cursor} limit: ${limit}`);
  const query = cursor ? {
    _id: {
      $gt: cursor,
    }
  } : {};

  const posts = await Post.find(query)
    .sort({ _id: 1 })
    .limit(limit + 1)
    .lean();

  const hasNext = posts.length > limit;

  if (hasNext) {
    posts.pop();
  }

  return {
    posts,
    pagination : {
      hasNext,
      nextCursor: hasNext && posts.length
        ? posts[posts.length - 1]._id : null,
    }
  }
};

export { fetchPosts }