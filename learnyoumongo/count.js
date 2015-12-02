var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var queryAge = process.argv[2];

mongo.connect(url, function(err, db) {
	if (err) throw err;
	var parrots = db.collection('parrots');
	parrots.count({
		age: {$gt: queryAge}
	}, function(err, count) {
		if (err) throw err;
		console.log(count);
		db.close();
	});
});