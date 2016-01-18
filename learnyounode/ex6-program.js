var getFilesWithFilter = require('./ex6-lsFilter');

var path = process.argv[2];
var extension = process.argv[3];
var callback = process.argv[4];

getFilesWithFilter(path, extension, function (err, files) {
	files.forEach(function(file){
		console.log(file);
	});
});

/*
────────────────────────────────────────────────────────────────────────────────
solution.js:

    var filterFn = require('./solution_filter.js')
    var dir = process.argv[2]
    var filterStr = process.argv[3]
    
    filterFn(dir, filterStr, function (err, list) {
      if (err)
        return console.error('There was an error:', err)
    
      list.forEach(function (file) {
        console.log(file)
      })
    })

*/