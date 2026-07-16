// just use bcrypt
import bcrypt, { compare } from 'bcrypt';

const SALT_ROUNDS = 10;

const bcryptHasher = {
  hash: async (password) => await bcrypt.hash(password, SALT_ROUNDS),
  compare: bcrypt.compare,
};

export {
  bcryptHasher,
};
