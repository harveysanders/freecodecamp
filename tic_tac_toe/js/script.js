(function(){
	//https://www.quora.com/Is-there-a-way-to-never-lose-at-Tic-Tac-Toe
	var playerLetter = '';
	var cpuLetter = '';
	var availableSpaces = ['1','2','3','4','5','6','7','8','9'];
	var corners = ['1', '3', '7', '9'];

	$('.player-choice').on('click', function(e){
		playerLetter = e.target.id;
		cpuLetter = playerLetter === 'X' ? 'O' : 'X';
		$('.choose-player').hide();
		$('.game-board').show();
	});

	$('.square').on('click', function(e){
		var spaceNum = e.target.className.charAt(0);
		var location = e.target.id;
		var locationID = '#' + e.target.id;
		handlePlayerMove(locationID);
		computerMove(location);
	});

	function handlePlayerMove(location){
		$(location).html(playerLetter);
	}

	function removePlayedSpaces(playedSpaces){
		var playedSpaces = Array.prototype.slice.call(arguments);
		availableSpaces = _.difference(availableSpaces, playedSpaces);
		corners = _.intersection(corners, availableSpaces);
		console.log('remaining spaces: ' + availableSpaces);
	}


	function computerMove(playerLocation){
		if (playerLocation === '5') {
			var space = chooseCorner();
			$(space).html(cpuLetter);
			removePlayedSpaces(space, playerLocation);
		} else if (corners.indexOf(playerLocation) > -1) {
			$('#5').html(cpuLetter);
			removePlayedSpaces('5', playerLocation);
		}

		function chooseCorner() {
			return '#' + corners[Math.floor(Math.random() * corners.length)];
		}
	}

	$('.game-board').hide();
})();