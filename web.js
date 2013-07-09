var express = require('express');

var app = express.createServer(express.logger());

var content;

fs.readFileSync('index.html', function read(err, data) {
  if (err) throw err;
  content = data;
});

app.get('/', function(request, response) {
  response.send("Hello world3");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
