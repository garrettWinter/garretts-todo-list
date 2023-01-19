const express = require('express');

const htmlRouter = require('./htmlRoutes.js');
const apiRouter = require('./apiRoutes.js');

const app = express();

app.use('/api', apiRouter);
app.use('/', htmlRouter);


module.exports = app;