(function(){
	//https://www.quora.com/Is-there-a-way-to-never-lose-at-Tic-Tac-Toe
	var playerLetter = '';
	var availableSpaces = [1,2,3,4,5,6,7,8,9];

	$('.player-choice').on('click', function(e){
		playerLetter = e.target.id;
		$('.choose-player').hide();
		$('.game-board').show();
	});

	$('.square').on('click', function(e){
		var spaceNum = e.target.className.charAt(0);
		var location = '#' + e.target.id;
		handlePlayerMove(location);
		computerMove();
	});

	function handlePlayerMove(location){
		$(location).html(playerLetter);
	}

	function computerMove(){

	}

	$('.game-board').hide();
})();