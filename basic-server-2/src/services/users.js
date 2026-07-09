import users from '../repositories/users.js';

const validate = async (user, required = []) => {
  const { id, username, email } = user;

  // 400 error for invalid create/update body
  if (required.includes('username') && !username) {
    throw { status: 400, message: 'username is required' };
  }

  if (required.includes('email') && !email) {
    throw { status: 400, message: 'email is required' };
  }

  if (username && username.length < 3 ) {
    throw { status: 400, message: 'username must be at least 3 characters' };
  }

  // 409 error if username or email already exist
  const existingUserName = await users.findByUserName(username);
  if (existingUserName && id !== existingUserName.id) {
    throw { status: 409, message: 'Username already in use' };
  }

  const existingEmail = await users.findByEmail(email);
  if (existingEmail && id !== existingEmail.id) {
    throw { status: 409, message: 'Email already in use' };
  }
};

const create = async (user) => {
  await validate(user, ['username', 'email']);

  const newUser = await users.create(user);
  return newUser;
};

const findById = async (id) => {
  const user = await users.findById(id);

  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  return user;
};

const update = async (id, user) => {
  // check if user exists
  await findById(id);

  await validate({ id, ...user });
  
  const update = await users.update(id, user);
  return update;
};

const remove = async (id) => {
  await users.remove(id);
  return true;
};

export default {
  create,
  findById,
  update,
  remove,
};