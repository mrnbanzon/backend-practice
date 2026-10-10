import * as authService from '../services/auth.service.js';

export const register = async (req, res, next) => {
  try {
    const { user, tokens } = await authService.registerUser(req.body);
    res.status(201).json({ user, tokens });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, tokens } = await authService.loginUser(email, password);
    res.status(200).json({ user, tokens });
  } catch (err) {
    next(err);
  }
};