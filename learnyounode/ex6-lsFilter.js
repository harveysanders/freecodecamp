var fs = require('fs');

module.exports = function (path, extension, callback) {
	fs.readdir(path, function(err, files) {
		if (err)
			return callback(err);
		return callback(null, files);
	});
};