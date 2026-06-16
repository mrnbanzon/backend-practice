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

const get = async (id) => {
  const user = await userRepo.findById(id);

  if (!user) {
    throw { status: 404, message: 'user not found' };
  }
  return user;
};

const list = async () => {
  return await userRepo.list();
};

const update = async (id, user) => {
  const { email } = user;

  const existingEmail = await userRepo.findByEmail(email);

  if (existingEmail && existingEmail.id !== id) {
    throw { status: 409, message: 'email is already in use' };
  }

  return await userRepo.update(id, user);
};

export default {
  create,
  get,
  list,
  update,
};