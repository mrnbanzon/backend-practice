import * as adminService from '../services/admin.service.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};