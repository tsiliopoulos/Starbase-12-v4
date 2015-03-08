var express = require('express');
var app = express();
var path = require('path');

// we are specifying the html directory as another public directory
app.use(express.static(path.join(__dirname, 'Starbase12-v4')));

app.get('/', function (req, res) {
  res.sendfile('index.html');
})

var server = app.listen(process.env.PORT || 3000, function () {

  //var host = server.address().address;
  var port = server.address().port;

  //console.log('Example app listening at http://%s:%s', host, port);

})