const express = require('express');

const htmlRouter = require('.');
const apiRouter = require('./apiRoutes');

const app = express();
// app.use(express.json()); //This is required so that express middleware can use json data.


app.use('/api', apiRouter);
app.use('/', htmlRouter);


module.exports = app;
