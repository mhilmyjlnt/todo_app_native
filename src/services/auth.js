const bcrypt = require('bcryptjs');
const AuthenticationError = require('../exeptions/AuthenticationError');
const { User } = require('../models');

const signIn = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new AuthenticationError('Invalid email, User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid password, wrong password');
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

module.exports = {
  signIn,
};