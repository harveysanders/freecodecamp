var http = require('http');
var url = process.argv[2];

http.get(url, function(response) {
	response.setEncoding('utf8');
	response.on('data', console.log); //equivalent to function(data){console.log(data);}
	response.on('error', console.error);
});