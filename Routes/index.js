const express = require('express');

const htmlRouter = require('./htmlRoutes');
const apiRouter = require('./apiRoutes');

const app = express();

app.use('/api', apiRouter);
app.use('/', htmlRouter);


module.exports = app;