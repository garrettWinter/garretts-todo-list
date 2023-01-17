const noteData = require('./db/db.json'); /// May need to move this


const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json()); //This is required so that express middleware can use json data.
app.use(express.urlencoded({ extended: true })); // This will have the middleware update special chars to encoded values

//HTML Specific Routes

// GET Route for the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//API Routes

app.get('/api/notes', (req, res) => res.json(noteData));

// POST request to add a review
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a new note`);

  console.log("about to log req.body:")
  console.log(req.body)
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // Variable for the object we will save
  const newNote = {
    title,
    text,
  };

  const response = {
    status: 'success',
    body: newNote,
  };
  console.log("about to log response:")
  console.log(response);
  res.status(201).json(response);


// Univeral Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

  }
);






app.listen(PORT, () => console.log(`Application listening http://localhost:${PORT}`));
