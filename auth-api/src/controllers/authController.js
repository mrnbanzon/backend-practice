import authService from "../services/authService.js";

const registerUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const registered = await authService.register({
      email,
      password,
      role
    });

    res.status(201).json({ message: 'User registered', data: registered });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authService.login({
      email,
      password
    });

    res.json({ message: 'Login successful', accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export default {
  registerUser,
  loginUser,
};