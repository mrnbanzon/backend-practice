import userService from '../services/userService.js';

const createUser = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await userService.create({ username, email });
    res.status(201).json(user);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message || 'Internal Server Error' });
    // next(error);
  }
};

const listUsers = async (req, res, next) => {
  try {
    const users = await userService.list();
    res.json(users);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message || 'Internal Server Error' });
    // next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.findById(id);
    res.json(user);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message || 'Internal Server Error' });
    // next(error); 
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.update(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message || 'Internal Server Error' });
    // next(error);
  }
};

export default {
  createUser,
  getUser,
  listUsers,
  updateUser
};


