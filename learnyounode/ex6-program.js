var lsFilter = require('./ex6-lsFilter');

var path = process.argv[2];
var extension = process.argv[3];
var callback = process.argv[4];

lsFilter(path, extension, function (err, files) {
	var filteredFiles = files.filter(function(file) {
		return file.split('.')[1] === extension;
	});
	filteredFiles.forEach(function(file){
		console.log(file);
	});
});

// official solution ------------------ //
/*
fs.readdir(process.argv[2], function (err, list) {
      list.forEach(function (file) {
        if (path.extname(file) === '.' + process.argv[3])
          console.log(file)
      })
    })
*/