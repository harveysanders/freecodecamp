var http = require('http');
var url = process.argv[2];

var respsonseData = [];

http.get(url, function(respsonse) {
	respsonse.setEncoding('utf8');
	respsonse.on('data', function(data) {
		respsonseData.push(data);
	});
	respsonse.on('error', console.error);
	respsonse.on('end', function(data) {
		var completeStr = respsonseData.join('');
		console.log(completeStr.length);
		console.log(completeStr);
	});
});

// official solution
/*
    var http = require('http')
    var bl = require('bl')
    
    http.get(process.argv[2], function (response) {
      response.pipe(bl(function (err, data) {
        if (err)
          return console.error(err)
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))  
    })
*/