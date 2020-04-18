// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// API Const Variables
// =============================================================
const apiNOTES = "/api/notes";
const apiNotesID = "/api/notes/:id";



// Routes
// =============================================================

//route that sends the user first to the home page
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
});

app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname,"notes.html"));
});


// APIs - GET
// =============================================================

//return all notes saved
app.get(apiNOTES, function(req,res) {

});

// APIs - POST
// =============================================================

//return new note
app.post(apiNOTES, function(req,res){

});

// APIs - DELETE
// =============================================================


app.delete(apiNotesID, function(req,res){

});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  