var express = require('express'),
	fs = require('fs')
	;
var app = express();

app.get('/books', function(req, res) {
	fs.readFile(process.argv[3], 'utf8', function(err, data) {
		if (err) throw err;
		var json = JSON.parse(data);
		res.json(json);
	});
});
app.listen(process.argv[2]);

/*
Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var express = require('express')
    var app = express()
    var fs = require('fs')
    
    app.get('/books', function(req, res){
      var filename = process.argv[3]
      fs.readFile(filename, function(e, data) {
        if (e) return res.send(500)
        try {
          books = JSON.parse(data)
        } catch (e) {
          res.send(500)
        }
        res.json(books)
      })
    })
    
    app.listen(process.argv[2])

────────────────────────────────────────────────────────────────────────────────
*/