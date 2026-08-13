const toUserResponse = (user) => {
  if (!user) {
    return null;
  }

  const { _id, username, email, bio, createdAt } = user;
  const userResponse = {
    id: _id,
    username,
    email,
    bio,
    createdAt,
  };

  return userResponse;
};

export default toUserResponse;