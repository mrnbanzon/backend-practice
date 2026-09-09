export function createUserService({ userRepo, passwordHasher }) {
  const createUser = async ({ username, email, password }) => {
    if (!username || !email || !password) {
      const err = new Error('Missing required fields');
      err.status = 400;
      throw err;
    }

    const exists = await userRepo.findByEmail(email);
    if (exists) {
      const err = new Error('User with email already exists');
      err.status = 409;
      throw err;
    }

    const hashedPassword = await passwordHasher.hash(password);
    const user = await userRepo.create({ username, email, passwordHash: hashedPassword });
    return {
      id: user.id,
      username: user.username,
      email: user.email
    };
  };

  return {
    createUser
  }
};