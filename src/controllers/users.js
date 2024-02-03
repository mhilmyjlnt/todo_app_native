const asyncHandler = require('express-async-handler');
const { findById } = require('../services/users');

const findUserLogin = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await findById(id);
  res.status(201).json({
    status: 'success',
    message: 'User found',
    data: user,
  });
});

module.exports = {
  findUserLogin,
};