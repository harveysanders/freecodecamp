var http = require('http');
var fs = require('fs');

var port = process.argv[2];
var path = process.argv[3];

var server = http.createServer(function (request, response) {
	var fileReadStream = fs.createReadStream(path);
	fileReadStream.on('open', function() {
		fileReadStream.pipe(response);
	});
	fileReadStream.on('error', function(err) {
		response.end(err);
	});
});

server.listen(port);

/* Official Solution
────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
    var fs = require('fs')
    
    var server = http.createServer(function (req, res) {
      res.writeHead(200, { 'content-type': 'text/plain' })
    
      fs.createReadStream(process.argv[3]).pipe(res)
    })
    
    server.listen(Number(process.argv[2]))

────────────────────────────────────────────────────────────────────────────────
*/