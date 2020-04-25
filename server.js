// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
const util = require("util");

const encoding = "utf-8";

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
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});


// APIs - GET
// =============================================================

// return all notes saved
app.get(apiNOTES, function(req,res) {

    const allNotes = getDBFile();
    console.log(allNotes);

    return res.json(allNotes);
});

// APIs - POST
// =============================================================

//return new note
app.post(apiNOTES, function(req,res){

    let newNote = req.body;
    newNote.id = new Date().getTime().toString();
    //console.log(newNote);

    let allNotes = getDBFile();
    allNotes.push(newNote);

    writeToDBFile(allNotes);
    
    res.status(201).send(newNote);
});

// APIs - DELETE
// =============================================================

app.delete(apiNotesID, function(req,res){

    // console.log(req.params);
    // console.log(req.params.id);

    let allNotes = getDBFile();
    let findID = req.params.id;

    let newNoteList = allNotes.filter(note => {
        if(note.id !== findID) return note;
    });
    //console.log(newNoteList);

    writeToDBFile(newNoteList);

    res.status(200).send("note deleted");
});


// HELPER FUNCTIONS
// =============================================================
function getDBFile(){
    let rawData = fs.readFileSync(path.join(__dirname,"/db/db.json"),"utf8");
    let jsonData = JSON.parse(rawData);

    return jsonData;
}

function writeToDBFile(tempJSON){

    let stringJSON = JSON.stringify(tempJSON,null,2);

    fs.writeFileSync(path.join(__dirname,"/db/db.json"),stringJSON);
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  