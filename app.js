const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

const apiRouter = require('./api/router');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRouter);

module.exports = app;
