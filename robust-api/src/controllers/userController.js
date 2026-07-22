import { asyncHandler } from "../middleware/asyncHandler.js";

import { created } from '../utils/response.js';

export function createUserController(userService) {
  return asyncHandler(
    async function (req, res, next) {
      const payload = req.body;
      const user = await userService.create(payload);
      return created(res, user);
    }
  );
};