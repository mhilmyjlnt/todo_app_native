const express = require('express');
const { userLoggedIn } = require('../controllers/auth');

const router = express.Router();

router.get('/', userLoggedIn, (req, res) => {
  if (req.user) {
    console.log(req.user.accessToken);
    res.render('index', { status: 'success', user: req.user.user.dataValues, accessToken: req.user.accessToken });
  } else {
    res.redirect('/login');
  }
});

router.get('/register', (req, res) => {
  res.sendFile('register.html', { root: 'src/public' });
});

router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'src/public' });
});

router.get('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.redirect('/login');
});

module.exports = router;