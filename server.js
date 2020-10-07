// Require express and path modules (npm packages)
const express = require('express');
const path = require('path');
const fs = require('fs');
const dbdata = path.join(__dirname, "db", "db.json");

// Tells node we're creating an express server
const app = express();

// Set up initial port and will use later in our listener
// This code will use whatever PORT is available OR use PORT 8000
const PORT = process.env.PORT || 8000;

// Set up middleware to handle data parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Create GET, POST & DELETE API Routes
app.get('/api/notes', function (req, res) {
    const dbGet = JSON.parse(fs.readFileSync (dbdata).toString());
    res.json(dbGet);
});

app.post('/api/notes', function (req, res) {
    const dbPost = JSON.parse(fs.readFileSync (dbdata).toString());
    const noteData = req.body;
    noteData.id = Date.now();
    dbPost.push(noteData);
    
    fs.writeFile(dbdata, JSON.stringify(dbPost), function (err) {
        if (err) {
            throw err;
        };
        res.json(noteData);
    });
});

app.delete('/api/notes/:id', function (req, res) {
    var dbDelete = JSON.parse(fs.readFileSync (dbdata).toString());
    console.log("this is before filter", dbDelete)
    dbDelete = dbDelete.filter(function (note) {
        console.log("this is after filter", dbDelete)
        return note.id != req.params.id;
    });
    fs.writeFile(dbdata, JSON.stringify(dbDelete), function (err) {
        if (err) {
            throw err;
        };
        res.json();
    });
});

// Create HTML Routes
// Code below handles when the user visits a page
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// This code 'starts' the server
app.listen(PORT, function () {
    console.log("App listening on PORT:" + PORT)
});