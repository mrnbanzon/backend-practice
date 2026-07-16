import crypto from 'crypto';

// mock users collection
const users = new Map()

const create = async (data) => {
  const { username, email, passwordHash } = data;
  const id = crypto.randomUUID();

  const user = {
    id,
    username,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  
  users.set(id, user);
  return user;
};

const findByEmail = async (email) => {
  const existing = [...users.values()].find((user) => {
    return user.email === email;
  });
  return existing;
};

const createUserRepo = () => {
  return {
    create,
    findByEmail,
  }
};

export {
  createUserRepo,
};