var express = require('express');

var app = express.createServer(express.logger());


app.get('/', function(request, response) {
var fs = require('fs');
var buf = new Buffer(256);
buf = fs.readFileSync("index.html");
  response.send(buf.toString('utf8'));
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
