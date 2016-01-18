var http = require('http');
var urls = [process.argv[2], process.argv[3], process.argv[4]];
var responses = [];
var responseCount = 0;

urls.forEach(function(url, index) {
  getData(url, index);
});

function getData(url, index) {
  http.get(url, function(response) {
    var responseData = [];
    response.setEncoding('utf8');
    response.on('data', function(data) {
      responseData.push(data);
    });
    response.on('error', console.error);
    response.on('end', function(data) {
      responses[index] = responseData.join('');
      responseCount++;
      if (responseCount === 3) {
        responses.forEach(function(response){
          console.log(response);
        });
      }
    });
  });
}