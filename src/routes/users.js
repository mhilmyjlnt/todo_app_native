const express = require('express');
const { findUserLogin } = require('../controllers/users');
const authCheck = require('../middleware/authCheck');

const router = express.Router();

router.get('/me', authCheck, findUserLogin);

module.exports = router;