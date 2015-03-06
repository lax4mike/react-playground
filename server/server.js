var express = require("express");
var app = express();

var path = require("path");

var _public = path.resolve(__dirname + "/../public");

// server public files
app.use(express.static(_public)); 

app.get("/api/compile", function (req, res) {
    res.send("Hello  World!  yo  g j");
});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("API listening at http://localhost:%s", host, port);

}); 


// module.export = server;
