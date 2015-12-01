var net = require('net');
var port = process.argv[2];

var server = net.createServer(function (socket) {
	//connection listener
	var date = new Date();
	// console.log('client connected');
	socket.on('end', function() {
		console.log('client disconnected.');
	});

    var year = date.getFullYear()
    var mo = parseInt(date.getMonth()) + 1;     // starts at 0
    var day = date.getDate()      // returns the day of month
    var hr = date.getHours()
    var min = date.getMinutes()

	socket.write(year + '-' + mo + '-' + day + ' ' + hr + ':' + min + '\n');
  	socket.pipe(socket);
  	socket.end();
});
server.listen(port, function() {
	// console.log('server bound');
});


// official solution

/*
────────────────────────────────────────────────────────────────────────────────
    var net = require('net')
    
    function zeroFill(i) {
      return (i < 10 ? '0' : '') + i
    }
    
    function now () {
      var d = new Date()
      return d.getFullYear() + '-'
        + zeroFill(d.getMonth() + 1) + '-'
        + zeroFill(d.getDate()) + ' '
        + zeroFill(d.getHours()) + ':'
        + zeroFill(d.getMinutes())
    }
    
    var server = net.createServer(function (socket) {
      socket.end(now() + '\n')
    })
    
    server.listen(Number(process.argv[2]))
*/