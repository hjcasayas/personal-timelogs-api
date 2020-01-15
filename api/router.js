const express = require('express');
const router = express.Router();

const userController = require('./user/user.controller');

router.get('/login', userController.login);

router.post('/register', userController.register);

router.get('/logout', userController.logout);

module.exports = router;
