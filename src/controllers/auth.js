const asyncHandler = require('express-async-handler');
const { createUser } = require('../services/users');
const { signIn } = require('../services/auth');
const { User } = require('../models');
const { createAccessToken, verifyAccessToken, decodePayload } = require('../tokenize/tokenManager');

const userSignUp = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await createUser(req.body);
  res.status(201).json({
    status: 'success',
    message: 'User created',
    data: user,
  });
});

const userSignIn = asyncHandler(async (req, res) => {
  const user = await signIn(req.body);
  const accessToken = await createAccessToken(user);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000,
    ),
  };

  res.cookie('accessToken', accessToken, cookieOptions);
  res.status(200).json({
    status: 'success',
    message: 'User signed in',
    data: {
      user,
      accessToken,
    },
  });
});

const userLoggedIn = asyncHandler(async (req, res, next) => {
  if (!req.cookies.accessToken) {
    next();
  }
  await verifyAccessToken(req.cookies.accessToken);
  const decode = await decodePayload(req.cookies.accessToken);

  const user = await User.findOne({
    where: {
      id: decode.id,
    },
    attributes: { exclude: ['password'] },
  });

  req.user = {
    user,
    accessToken: req.cookies.accessToken,
  };
  next();
});

module.exports = {
  userSignUp,
  userSignIn,
  userLoggedIn,
};