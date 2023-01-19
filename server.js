const express = require('express');
const routes = require('./routes/mainRouting');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json()); //This is required so that express middleware can use json data.
app.use(express.urlencoded({ extended: true })); // This will have the middleware update special chars to encoded values

app.use('/', routes);

app.listen(PORT, () => console.log(`Application listening http://localhost:${PORT}`));
