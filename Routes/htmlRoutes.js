const html = require('express').Router();
const path = require('path');

// GET Route for the notes page
html.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

//Univeral Route for homepage
html.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = html;