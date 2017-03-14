var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, "./node_modules")))

app.listen(8000, function() {
    console.log("listening on port 8000")
})
