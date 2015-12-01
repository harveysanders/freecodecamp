var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
	var pathname = url.parse(req.url, true).pathname;
	var queryDate = new Date(url.parse(req.url, true).query.iso);

	function respond(JSON) {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(JSON);
		res.end();
	}

	if (pathname === '/api/parsetime') {
		var formattedDate = {};
		formattedDate.hour = queryDate.getHours();
		formattedDate.minute = queryDate.getMinutes();
		formattedDate.second = queryDate.getSeconds();
		respond(JSON.stringify(formattedDate));
		
	} else if (pathname === '/api/unixtime') {
		var formattedDate = {};
		formattedDate.unixtime = queryDate.getTime();
		respond(JSON.stringify(formattedDate));
	} else {
		res.writeHead(404);
		res.end();
	}
});

server.listen(Number(process.argv[2]));

/* Offical Solution
────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
    var url = require('url')
    
    function parsetime (time) {
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      }
    }
    
    function unixtime (time) {
      return { unixtime : time.getTime() }
    }
    
    var server = http.createServer(function (req, res) {
      var parsedUrl = url.parse(req.url, true)
      var time = new Date(parsedUrl.query.iso)
      var result
    
      if (/^\/api\/parsetime/.test(req.url))
        result = parsetime(time)
      else if (/^\/api\/unixtime/.test(req.url))
        result = unixtime(time)
    
      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(Number(process.argv[2]))

────────────────────────────────────────────────────────────────────────────────
*/