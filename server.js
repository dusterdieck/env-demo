// Dependencies
// =============================================================
require("dotenv").config();
var express = require("express");
var path = require("path");
const axios = require("axios");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/movies/:movie", function(req, res) {
    const api_key = process.env.MOVIEDB_API_KEY;

    var queryURL = "https://www.omdbapi.com/?t=" + req.params.movie + "&apikey=" + api_key;
    axios.get(queryURL)
        .then(function(movies) {
            res.json(movies.data);
        });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
