const express = require('express');
const router = express();

const userRoutes = require('./user/user.routes');
const authRoutes = require('./auth/auth.routes');

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
