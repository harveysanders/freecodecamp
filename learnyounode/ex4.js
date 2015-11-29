var fs = require('fs');
var testFile = process.argv[2];

fs.readFile(testFile, 'utf8', function(err, data) { //'utf8' will return data as a string.
	if (err) throw err;
	console.log(data.split('\n').length - 1);
});