(function(){

	function queryWikipedia(query){
		$.get('http://en.wikipedia.org/w/api.php?action=query&list=search&callback=?&format=json&srsearch=' + encodeURI(query), function(data){
			console.log(data);
		}, 'json'); //NEED to pass 'json' after callback OR use getJSON(). Look up why later.
	}

	queryWikipedia('costa rica');

	
})();