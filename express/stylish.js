var express = require('express');
var app = express();
var port = 8000;

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.listen(port || process.argv[2]);