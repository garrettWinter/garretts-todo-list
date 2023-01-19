const express = require('express');

const htmlRouter = require('./htmlRoutes.js');
const apiRouter = require('./apiRoutes.js');

const app = express();

//Defining route paths
app.use('/api', apiRouter);
app.use('/', htmlRouter);


module.exports = app;