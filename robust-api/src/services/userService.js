import { ApiError } from "../errors/ApiError.js";

export function createUserService({ userRepo, passwordHasher }) {
  return {
    async create({ username, email, password}) {
      if (!username || !email || !password) {
        throw new ApiError(400, 'MISSING_FIELDS', 'missing user fields');
      }

      const exists = await userRepo.findByEmail(email);
      if (exists) {
        throw new ApiError(409, 'USER_EXISTS', 'user with email exists');
      }

      const hash = await passwordHasher.hash(password);
      const user = await userRepo.create({
        username,
        email,
        passwordHash: hash,
      });

      return {
        id: user.id,
        username: user.username,
        email: user.email
      };
    },
  };
};