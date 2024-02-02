const asyncHandler = require('express-async-handler');
const {
  createUser,
  findAllUser,
  findUserById,
  findUserByEmail,
  updateUser,
  updateUserProfile,
  deleteUser,
  findLenghtUsers, updateNewPasswordByUser, deleteUserByUser,
} = require('../services/users');
const AuthenticationError = require('../exeptions/AuthenticationError');

const findAllLenghtUsers = asyncHandler(async (req, res) => {
  const users = await findLenghtUsers();
  res.status(200).json({
    status: 'success',
    message: 'List of all users',
    data: users,
  });
});

const createNewUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await createUser(req.body);
  res.status(201).json({
    status: 'success',
    message: 'User created',
    data: user,
  });
});

const findAll = asyncHandler(async (req, res) => {
  const { role } = req.user;
  if (role !== 'ADMIN') {
    throw new AuthenticationError('You must be an admin, not a user');
  }
  const users = await findAllUser(role);
  res.status(200).json({
    status: 'success',
    message: 'List of all users',
    data: users,
  });
});

const findById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);
  res.status(200).json({
    status: 'success',
    message: 'User found',
    data: user,
  });
});


module.exports = {
  findAllLenghtUsers,
  createNewUser,
  findAll,
  findById,
};