var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/learnyoumongo';
var size = process.argv[2];

mongo.connect(url, function(err, db) {
	if (err) throw err;
	var prices = db.collection('prices');
	prices.aggregate([
		{ $match: {size: size}},
		{ $group: {
			_id: 'avgPrice', //arbitrary string
			avgPrice: {
				$avg: '$price' //match key
			}
		}}
	]).toArray(function(err, results) {
		if (err) throw err;
		var avgPrice = results[0].avgPrice.toFixed(2);
		console.log(avgPrice);
		db.close();
	});
});

