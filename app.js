// require express module
const express = require("express");

// store express function in variable 'app'
const app = express();

// set up initial port and allow it to use whatever port Heroku has available, or use 8000
const PORT = process.env.PORT || 8000;

// set up middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.listen(PORT, function(){
    console.log("App listening on PORT:" + PORT)
});