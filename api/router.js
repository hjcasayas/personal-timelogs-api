const express = require('express');
const router = express.Router();

const userController = require('./user/user.controller');

router.post('/register', userController.register);

module.exports = router;
