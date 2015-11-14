(function(){
	//https://www.quora.com/Is-there-a-way-to-never-lose-at-Tic-Tac-Toe
	var playerLetter = '';
	var cpuLetter = '';
	var availableSpaces = ['1','2','3','4','5','6','7','8','9'];
	var corners = ['1', '3', '7', '9'];
	var edges = ['2', '4', '6', '8'];
	var winningSequences = [['1', '2', '3'], ['4','5','6'], ['7','8','9'], ['1','4','7'], ['2','5','8'], ['3','6','9'], ['1','5','9'], ['3','5','7']];
	var winningSequencesStrings = ["123", "456", "789", "147", "258", "369", "159", "357"];
	var playerMoves = [];
	var cpuMoves = [];

	function handlePlayerMove(location){
		playerMoves.push(location);
		displayLetter(playerLetter, location);
	}

	function removePlayedSpaces(playedSpaces){
		var playedSpaces = Array.prototype.slice.call(arguments);
		availableSpaces = _.difference(availableSpaces, playedSpaces);
		corners = _.intersection(corners, availableSpaces);
		edges = _.intersection(edges, availableSpaces);
		console.log('remaining spaces: ' + availableSpaces);
	}


	function computerMove(playerLocation){
		if (playerLocation === '5') {
			var space = chooseCorner();
			cpuMoves.push(space);
			displayLetter(cpuLetter, space);
			removePlayedSpaces(space, playerLocation);
		} else if (corners.indexOf(playerLocation) > -1) {
			cpuMoves.push('5');
			displayLetter(cpuLetter, '5');
			removePlayedSpaces('5', playerLocation);
		} else if (edges.indexOf(playerLocation) > -1) {
			$()
		}

		function chooseCorner() {
			return corners[Math.floor(Math.random() * corners.length)];
		}

		function chooseEdge() {
			return edges[Math.floor(Math.random() * edges.length)];
		}
	}

	function checkForWin(playedSpaces){
		return _.findIndex(winningSequences, function(seqArr) {
			return (_.intersection(playedSpaces, seqArr) === seqArr );
		});
	}

	function displayLetter(letter, location) {
		function convertToID(str) {
			return '#' + str;
		}
		$(convertToID(location)).html(letter);
	}

	$('.player-choice').on('click', function(e){
		playerLetter = e.target.id;
		cpuLetter = playerLetter === 'X' ? 'O' : 'X';
		$('.choose-player').hide();
		$('.game-board').show();
	});

	$('.square').on('click', function(e){
		var spaceNum = e.target.className.charAt(0);
		var location = e.target.id;

		if ($('#' + location).html() === '') {
			handlePlayerMove(location);
			computerMove(location);
		}
	});

	$('.game-board').hide();
})();