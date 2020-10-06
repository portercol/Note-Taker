// Require express and path modules (npm packages)
const express = require("express");
const path = require("path");
const fs = require("fs");
// const brandNewNote = require("./public/assets/js/index");

// Tells node we're creating an express server
const app = express();

// Set up initial port and will use later in our listener
// This code will use whatever PORT is available OR use PORT 8000
const PORT = process.env.PORT || 8000;

// Set up middleware to handle data parsing
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Create HTML GET requests
// Code below handles when the user visits a page
// Each case the user is shown a differnt content page
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create POST requests using an API route
app.post("/api/notes", function(req, res){
// Create var and store JSON.stringify and pass thru req.body
    const myNewNote = JSON.stringify(req.body);
// Use 'fs' to write new file to db.json, passing thru var created above
    fs.writeFile("db/db.json", myNewNote, (err) => {
        if (err) {
            return console.log(err);
        }
    })


});

// This code 'starts' the server
app.listen(PORT, function(){
    console.log("App listening on PORT:" + PORT)
});

