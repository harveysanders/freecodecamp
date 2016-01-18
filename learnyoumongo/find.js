var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var queryAge = parseInt(process.argv[2]);

mongo.connect(url, function(err, db) {
	var parrots = db.collection('parrots');
	parrots.find({
		age: {$gt: queryAge}
	}).toArray(function(err, documents) {
		if (err)
			throw err;
		console.log(documents);
		db.close();
	});
	
});
