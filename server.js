// Require express and path modules (npm packages)
const express = require('express');
const path = require('path');
const fs = require('fs');

// Tells node we're creating an express server
const app = express();

// Set up initial port and will use later in our listener
// This code will use whatever PORT is available OR use PORT 8000
const PORT = process.env.PORT || 8000;

// Set up middleware to handle data parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Create GET & POST requests using an API route
app.get("/api/notes", function (req, res) {
    const whatever = require('./db/db.json');
    res.json(whatever)
});


app.post("/api/notes", function (req, res) {
    const whatever = require('./db/db.json');
    const myNewNote = req.body;
    whatever.push(myNewNote);
    fs.writeFile("db/db.json", JSON.stringify(whatever), (err) => {
        if (err) {
            return myNewNote;
        }
    });
});

// Create HTML GET requests
// Code below handles when the user visits a page
// Each case the user is shown a differnt content page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// This code 'starts' the server
app.listen(PORT, function () {
    console.log("App listening on PORT:" + PORT)
});

