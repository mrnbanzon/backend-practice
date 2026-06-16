import userRepo from '../repositories/userRepo.js';

const create = async (user) => {
  const { username, email } = user;

  if (!username || !email) {
    throw { status: 400, messsage: 'usernaame and email required' };
  }

  if (await userRepo.findByEmail(email)) {
    throw { status: 409, message:'email is already in use' };
  }

  return await userRepo.create({ username, email });
};

const list = async () => {
  return await userRepo.list();
};

export default {
  create,
  list
};