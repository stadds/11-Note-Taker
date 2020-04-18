// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
const util = require("util");

const encoding = "utf-8";

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// API Const Variables
// =============================================================
const apiNOTES = "/api/notes";
const apiNotesID = "/api/notes/:id";



// Routes
// =============================================================

//route that sends the user first to the home page
app.get("/",function(req,res){
    console.log(__dirname)
    res.sendFile(path.join(__dirname,"/index.html"));
});

app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname,"/notes.html"));
});


// APIs - GET
// =============================================================

// return all notes saved
app.get(apiNOTES, function(req,res) {

    const allNotes = JSON.parse(fs.readFileSync(path.join(__dirname,"/db/db.json")));

    console.log(allNotes);

    return res.json(allNotes);
});

// APIs - POST
// =============================================================

//return new note
// app.post(apiNOTES, function(req,res){
//     console.log(req.body);

// });

// APIs - DELETE
// =============================================================


// app.delete(apiNotesID, function(req,res){

// });



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  