import UserService from './service.js';

const createUser = async(req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await UserService.createUser({ username, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

const fetchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const updatedUser = await UserService.updateUser(id, { username, email });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.status(204).send();
  } catch (err) {
    if (err.message === 'User not found') {
      console.log('Ignoring deletion error: User not found');
      return res.status(404).send();
    }
    next(err);
  }
};

export default { createUser, fetchUser, updateUser, deleteUser };