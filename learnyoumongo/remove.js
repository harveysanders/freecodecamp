var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/' + process.argv[2];
var collectionName = process.argv[3];
var _id = process.argv[4];

mongo.connect(url, function(err, db) {
	if (err) throw err;
	var collection = db.collection(collectionName);
	collection.remove({
		_id: _id
	}, function(err, docs) {
		if (err) throw err;
		db.close();
	});
})