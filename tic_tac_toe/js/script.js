(function(){
	//https://www.quora.com/Is-there-a-way-to-never-lose-at-Tic-Tac-Toe
	var playerLetter = '';
	var cpuLetter = '';
	var availableSpaces = ['1','2','3','4','5','6','7','8','9'];
	var corners = ['1', '3', '7', '9'];
	var edges = ['2', '4', '6', '8'];
	var winningSequences = [['1', '2', '3'], ['4','5','6'], ['7','8','9'], ['1','4','7'], ['2','5','8'], ['3','6','9'], ['1','5','9'], ['3','5','7']];
	var playerMoves = [];
	var cpuMoves = [];

	// ------------------------- Test Area

	function handlePlayerMove(location){
		playerMoves.push(location);
		displayLetter(playerLetter, location);
		removePlayedSpaces(location);
	}

	function removePlayedSpaces(playedSpaces){
		var playedSpaces = Array.prototype.slice.call(arguments);
		availableSpaces = _.difference(availableSpaces, playedSpaces);
		corners = _.intersection(corners, availableSpaces);
		edges = _.intersection(edges, availableSpaces);
		console.log('remaining spaces: ' + availableSpaces);
	}

	function computerMove(playerLocation){
		var centerOpen = $('#5').html() === '';
		if (playerLocation === '5') {
			console.log('playing corner');
			playCpuMove(chooseCorner());	
		} else if (centerOpen) {
			console.log('playing center');
			playCpuMove('5');
		}else if (corners.indexOf(playerLocation ) > -1) {
			console.log('playing corner 2');
			playCpuMove(chooseCorner());
		} else if (edges.indexOf(playerLocation) > -1) {
			switch(playerLocation) {
				case '2':
					console.log('playing opp edge');
					var spacesNotToPlay = _.union(playerMoves, cpuMoves, ['1','3']);		
					break;
				case '4':
					console.log('playing opp edge');
					var spacesNotToPlay = _.union(playerMoves, cpuMoves, ['1','7']);		
					break;
				case '6':
					console.log('playing opp edge');
					var spacesNotToPlay = _.union(playerMoves, cpuMoves, ['3','9']);		
					break;
				case '8':
					console.log('playing opp edge');
					var spacesNotToPlay = _.union(playerMoves, cpuMoves, ['7','9']);		
					break;
			}
			playCpuMove(getRandomElement(_.difference(corners, spacesNotToPlay)));
			
		} else if (_.contains(availableSpaces, blockWin())){
			console.log('blocking win');
			playCpuMove(blockWin());
		} else {
			console.log('playing any space');
			playCpuMove(chooseAnyAvailSpace());
		}

		function chooseCorner() {
			return getRandomElement(_.difference(corners, playerMoves, cpuMoves));
		}

		function chooseEdge() {
			return getRandomElement(edges);
		}

		function blockWin(){
			return getRandomElement(_.flatten(winningSequences.map(function(seqArr){
				return _.intersection(playerMoves, seqArr);
			}).filter(function(seqArr){
				return seqArr.length >= 2; //only show sequences than need one move to win
			}).map(function(almostWinSeq){ 
				return winningSequences.map(function(winSeq){
					return _.difference(winSeq, almostWinSeq); //what are those winning moves?
				});
			}), true).filter(function(movesToBlockWin){
				return movesToBlockWin.length === 1;
			}))[0];
		}
		function chooseAnyAvailSpace() {
			return getRandomElement(availableSpaces);
		}

		function playCpuMove(location) {
			cpuMoves.push(location);
			displayLetter(cpuLetter, location);
			removePlayedSpaces(location, playerLocation);
		}
	}

	function checkForWin(playedSpaces){
		var winningMatch = winningSequences.map(function(seqArr){
			return _.intersection(seqArr, playedSpaces);
		}).filter(function(seqArr){
			return seqArr.length === 3;
		});
		if (winningMatch.length > 0) {
			winningMatch[0].map(function(location){
				$('#' + location).css('background-color', 'green');
			});
		}
		return winningMatch.length > 0;
	}

	function displayLetter(letter, location) {
		function convertToID(str) {
			return '#' + str;
		}
		$(convertToID(location)).html(letter);
	}
	// ---------------------- HELPER FUNCTIONS -------------------------------//

	function getRandomElement(array) {
		return array[Math.floor(Math.random() * array.length)];
	}
	// ----------------------^^ HELPER FUNCTIONS ^^-------------------------------//	
	$('.player-choice').on('click', function(e){
		playerLetter = e.target.id;
		cpuLetter = playerLetter === 'X' ? 'O' : 'X';
		$('.choose-player').hide();
		$('.game-board').show();
	});

	$('.square').on('click', function(e){
		var spaceNum = e.target.className.charAt(0);
		var location = e.target.id;

		//prevent user overwite of played square
		if ($('#' + location).html() === '') {
			handlePlayerMove(location);
			computerMove(location);
			//check each move for win
			if (checkForWin(playerMoves)) {
				console.log('player wins!');
			} else if (checkForWin(cpuMoves)){
				console.log('cpu wins!');
			}
		}
	});

	$('.game-board').hide();
})();