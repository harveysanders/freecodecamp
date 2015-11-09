(function(){
	var showingResults = false;
	var $searchDiv = $('#search-div');

	function queryWikipedia(query){
		$.get('http://en.wikipedia.org/w/api.php?action=query&list=search&callback=?&format=json&srprop=snippet%7Ctitlesnippet%7Credirecttitle&titles&srsearch=' + encodeURI(query), function(data){
			console.log(data);
			var searchResults = data.query.search.map(function(result){
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
		return $('<a>', {
			href: '//en.wikipedia.org/wiki/' + spacesToUnderscores(searchResult.title),
			html: $('<div>', {
				'class': 'search-result',
				html: '<dl><dt>' + searchResult.title + '<dd>' + searchResult.snippet + '...</dd></dt></dl>'
			})
		});
	}

	function appendElements(elements){
		$('.results-view').append(elements);
	}

	function spacesToUnderscores(string){
		return string.replace(' ', '_');
	}

	function transitionView(){
		$('.initial-view').hide('slow', function(){
			$searchDiv.detach().removeClass('vertical-center').addClass('text-center');
			$('#search').removeClass('.search-box');
			$('.results-view').show('slow').prepend($searchDiv);
		});
	}

	$('#search').on('keyup', function(e){
		if (e.keyCode === 13) {
			handleSearchInput();
			if(!showingResults){
				transitionView();
			}
			
		}
	});

	$('.search-icon').on('click', function(){
		$('.search-box').addClass('.search-icon-animated');
	});

	$('results-view').hide();
})();