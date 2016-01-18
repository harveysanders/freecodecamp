var express = require('express'),
	stylus = require('stylus')
	;

var app = express();
var port = null; //set port# to test with browser

app.use(stylus.middleware({src: __dirname + '/public'}));
app.use(express.static(__dirname + '/public'));

app.listen(port || process.argv[2]);