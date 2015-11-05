(function(){
	var searchResults = [];
	function queryWikipedia(query){
		$.get('http://en.wikipedia.org/w/api.php?action=query&list=search&callback=?&format=json&srprop=snippet%7Ctitlesnippet%7Credirecttitle&titles&srsearch=' + encodeURI(query), function(data){
			console.log(data);
			searchResults = data.query.search.map(function(result){
				return createJQueryElement(result);
			});
			appendElements(searchResults);

		}, 'json'); //NEED to pass 'json' after callback OR use getJSON(). Look up why later.
	}

	function handleSearchInput(){
		var query = $('#search').val();
		queryWikipedia(query);
	}
		
	function createJQueryElement(searchResult){
		return $('<div>', {
			'class': 'search-result',
			html: '<dl><dt>' + searchResult.title + '<dd>' + searchResult.snippet + '...</dd></dt></dl>'
		});
	}

	function appendElements(elements){
		$('.container').append(elements);
	}

	function spaceToUnderscore(string){
		return string.replace(' ', '_');
	}

	$('#search').on('keyup', function(e){
		if (e.keyCode === 13) {
			handleSearchInput();
		}
	});
})();