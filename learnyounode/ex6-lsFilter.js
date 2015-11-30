var fs = require('fs');

module.exports = function (path, extension, callback) {
	fs.readdir(path, function(err, files) {
		if (err)
			return callback(err);

		var filteredFiles = files.filter(function(file) {
			return file.split('.')[1] === extension;
		});

		return callback(null, filteredFiles);
	});
};

/*
────────────────────────────────────────────────────────────────────────────────
solution_filter.js:

    var fs = require('fs')
    var path = require('path')
    
    module.exports = function (dir, filterStr, callback) {
    
      fs.readdir(dir, function (err, list) {
        if (err)
          return callback(err)
    
        list = list.filter(function (file) {
          return path.extname(file) === '.' + filterStr
        })
    
        callback(null, list)
      })
    }

*/