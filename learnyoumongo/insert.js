var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var newDoc = {firstName: process.argv[2], lastName: process.argv[3]};

mongo.connect(url, function(err, db) {
	if (err) throw err;
	var docs = db.collection('docs');
	docs.insert(newDoc, function(err, docs) {
		if (err) throw err;
		console.log(JSON.stringify(newDoc));
		db.close();
	});
});