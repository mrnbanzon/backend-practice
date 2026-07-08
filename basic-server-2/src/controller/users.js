import userService from '../services/users.js';

const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch(err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.findById(id);
    res.json(user);
  } catch(err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = await userService.update(id, req.body);
    res.json(update);
  } catch(err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.remove(id);
    res.status(204).end();
  } catch(err) {
    next(err);
  }
};

export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};