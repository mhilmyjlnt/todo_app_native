const bcrypt = require('bcryptjs');
const InvariantError = require('../exeptions/InvariantError');
const { User } = require('../models');

const createUser = async ({
  name, email, password,
}) => {
  console.log(email, 'email');
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser !== null) {
    throw new InvariantError(`Email '${email}' sudah terdaftar`);
  }

  const user = {
    name,
    email,
    password: await bcrypt.hash(password, 10),
  };

  const newUser = await User.create(user);
  return newUser;
};

const findById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return user;
};

module.exports = {
  createUser,
  findById,
};