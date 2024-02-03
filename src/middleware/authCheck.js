const asyncHandler = require('express-async-handler');
const AuthenticationError = require('../exeptions/AuthenticationError');
const { verifyAccessToken, decodePayload } = require('../tokenize/tokenManager');
const NotFoundError = require('../exeptions/NotFoundError');
const { User } = require('../models');

const authCheck = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AuthenticationError('Not authenticated, no token provided');
  }

  await verifyAccessToken(token);
  const decode = await decodePayload(token);

  console.log(decode, 'decode');

  if (!decode || typeof decode === 'string') {
    throw new AuthenticationError('Invalid token');
  }

  console.log(decode.id, 'decode.id');

  const user = await User.findOne({
    where: {
      id: decode.id,
    },
    attributes: { exclude: ['password'] },
  });

  console.log(user, 'user');

  if (!user) {
    throw new NotFoundError(`User dengan id '${decode.id}' tidak ditemukan`);
  }

  req.user = user;
  next();
});

module.exports = authCheck;