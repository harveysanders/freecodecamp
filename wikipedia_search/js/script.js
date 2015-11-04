(function(){
	//http://www.html5rocks.com/en/tutorials/cors/
	function createCORSRequest(method, url) {
	  var xhr = new XMLHttpRequest();
	  if ("withCredentials" in xhr) {

	    // Check if the XMLHttpRequest object has a "withCredentials" property.
	    // "withCredentials" only exists on XMLHTTPRequest2 objects.
	    xhr.open(method, url, true);

	  } else if (typeof XDomainRequest !== "undefined") {

	    // Otherwise, check if XDomainRequest.
	    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
	    xhr = new XDomainRequest();
	    xhr.open(method, url);

	  } else {

	    // Otherwise, CORS is not supported by the browser.
	    xhr = null;

	  }
	  return xhr;
	}

	function makeCORSRequest(){
		var url = 'http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=costa%20rica';

		var xhr = createCORSRequest('GET', url);
		if (!xhr) {
		  console.log('CORS not supported');
		  return;
		}
		xhr.onload = function() {
			var text = xhr.responseText;
			console.log(text);
		};
		xhr.onerror = function(){
			console.log('whoops, there was an error making the request.');
		};

		xhr.send();
	}
	
	makeCORSRequest();
	
	function queryWikipedia(query){
		$.get('http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + encodeURI(query), function(data){
			console.log(data);
		});
	}

	//queryWikipedia('costa rica');
})();