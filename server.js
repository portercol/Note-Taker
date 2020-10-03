// Require express module (npm package)
const express = require("express");
const path = require("path");

// Tells node we're creating an express server
const app = express();

// Set up initial port and will use later in our listener
const PORT = process.env.PORT || 8000;

// Set up middleware to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Create HTML GET requests
// Code below handles when the user visits a page
// Each case the user is shown a differnt content page
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
});

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"))
})



// This code 'starts' the server
app.listen(PORT, function(){
    console.log("App listening on PORT:" + PORT)
});