export function createUserController(userService) {
  return async function (req, res, next) {
    try {
      const payload = req.body;
      const user = await userService.create(payload);
      res.status(201).json({ data: user });
    } catch (err) {
      next(err);
    }
  };
};