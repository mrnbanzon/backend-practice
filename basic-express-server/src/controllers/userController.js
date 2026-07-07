const getAllUsers = (req, res, next) => {
  res.send('All users');
};

const getUserById = (req, res, next) => {
  const userId = req.params.id;
  res.send(`User with ID ${userId}`);
};

export {
  getAllUsers,
  getUserById,
};