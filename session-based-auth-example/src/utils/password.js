import argon2 from 'argon2';

const hashPassword = async (plain) => {
  return argon2.hash(plain);
};

const verifyPassword = async (hash, plain) => {
  return argon2.verify(hash, plain);
};

export {
  hashPassword,
  verifyPassword
};