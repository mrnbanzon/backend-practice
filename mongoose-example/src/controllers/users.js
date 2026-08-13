import userService from '../services/userService.js';
import toUserResponse from '../utils/dto/toUserResponse.js';

const createUser = async (req, res, next) => {
  const userData = req.body;
  const user = await userService.createUser(userData);
  res.status(201).json(toUserResponse(user));
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.getUserById(id);
  res.json(toUserResponse(user));
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const userData = req.body;
  const user = await userService.updateUser(id, userData);
  res.json(toUserResponse(user));
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  await userService.deleteUser(id);
  res.status(204).send();
};

export default {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};