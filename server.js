const express = require('express');
const path = require('path');
const routes = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json()); //This is required so that express middleware can use json data.
app.use(express.urlencoded({ extended: true })); // This will have the middleware update special chars to encoded values

app.use(express.static('public'));

app.use('/', routes);

app.listen(PORT, () => console.log(`Application listening http://localhost:${PORT}`));
