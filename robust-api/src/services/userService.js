export function createUserService({ userRepo, passwordHasher }) {
  return {
    async create({ username, email, password}) {
      if (!username || !email || !password) {
        const e = new Error('missing fields');
        e.status = 400;
        throw e;
      }

      const exists = await userRepo.findByEmail(email);
      if (exists) {
        const e = new Error('email exists');
        e.status = 409;
        throw e;
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