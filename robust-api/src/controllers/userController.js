import { asyncHandler } from "../middleware/asyncHandler.js";

export function createUserController(userService) {
  return asyncHandler(
    async function (req, res, next) {
      const payload = req.body;
      const user = await userService.create(payload);
      res.status(201).json({ data: user });
    }
  );
};