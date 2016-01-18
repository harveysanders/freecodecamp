var express = require('express');
var path = require('path'); //path is unneccesary for this small app.
var app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.argv[2]);