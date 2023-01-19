const api = require('express').Router();
// const express = require('express');
// // api.use(express.json()); //This is required so that express middleware can use json data.'

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let noteData = require('../db/db.json');

//API GET route for notes to return all note data
api.get('/notes', (req, res) => {
    res.status(200).json(noteData);
});


// POST request to add a review
api.post('/notes', (req, res) => {
    // Log that a POST request was received
    console.log(`${req.method} request received to add a new note`);

    console.log("about to log req.body:")
    console.log(req.body)
    // // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // Variable for the object we will save
    const newNote = {
        title,
        text,
        id: uuidv4(),
    };
    console.log("about to log newNote:");
    console.log(newNote);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {

        //Getting pre-saved data
        console.log("about to log data");
        console.log(data);


        const savedData = JSON.parse(data);

        //Adding new note to the array
        savedData.push(newNote);

        fs.writeFile(
            './db/db.json', JSON.stringify(savedData, null, 1),
            (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully added the new note!')
        );

        //Re-updating Note data after the POST
        noteData = savedData;

        const response = {
            status: 'success',
            body: newNote,
        };
        res.status(201).json(response);

    });
});

// DELETE request to delete a review
api.delete('/notes/:id', (req, res) => {
    // Log that a POST request was received
    console.log(`${req.method} request received to delete a note with ID:\n${req.params.id}\n`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {

        //Getting pre-saved data
        let existingData = JSON.parse(data);
        let deleteIndex = existingData.findIndex(p => p.id === req.params.id);
        console.log(deleteIndex);


        if (deleteIndex === -1) {
            const response = {
                status: `Cannot find that ID`,
            };
            res.status(404).json(response);
            console.log('Delete request received for an ID that was not found.')
            return;
        }

        //Deleteing the specific id from the array
        existingData.splice(deleteIndex, 1);

        //Re-updating Note data after the POST
        noteData = existingData;

        fs.writeFile(
            './db/db.json', JSON.stringify(existingData, null, 1),
            (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully deleted a note!')
        );

        const response = {
            status: `ID: ${req.params.id}, has been deleted`,
        };
        res.json(response);

    });
});

module.exports = api;