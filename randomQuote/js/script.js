

function displayQuote(data) {
	$('#quote_output').empty();
	$quoteText = $('<h2>').text(data.quoteText);
	$quoteAuthor = $('<em>').text(data.quoteAuthor);
	$('#quote_output').append($quoteText, $quoteAuthor);
}

function getQuote() {
	$.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data){
		displayQuote(data);
	});
}


var testQuote = {
	quoteText: "A good rest is half the work.",
	quoteAuthor: "Guy Ritchie", senderName: "", senderLink: "",
	quoteLink: "http://forismatic.com/en/ec1e645f8f/"
};


$('#new_quote_btn').on('click', function(){
	getQuote();
});
$('#quote_output').prop('disabled', true);

displayQuote(testQuote);