var fs = require('fs');
var args = process.argv;


var buffer = fs.readFileSync(args[2]); //argv[1] is the file itself
var fileAsString = buffer.toString();

console.log(fileAsString.split('\n').length - 1);