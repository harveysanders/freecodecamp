(function(){

	var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

	var buttonColors = ['green-button', 'red-button', 'yellow-button', 'blue-button'];
	var gameStarted = false;
	var computerPlayButtons,
		userPlayButtons,
		playCount
		;


	function activateButton(buttonColor) {
		function toggleLight(buttonColor){
			$('.' + buttonColor).toggleClass(buttonColor + '-lit');
		}

		switch(buttonColor) {
			case 'green-button':
				greenSound.play();
				toggleLight(buttonColor);
				setTimeout(function() {toggleLight(buttonColor);}, 500);
				break;

			case 'red-button':
				redSound.play();
				toggleLight(buttonColor);
				setTimeout(function() {toggleLight(buttonColor);}, 500);
				break;
			case 'yellow-button':
				yellowSound.play();
				toggleLight(buttonColor);
				setTimeout(function() {toggleLight(buttonColor);}, 500);
				break;
			case 'blue-button':
				blueSound.play();
				toggleLight(buttonColor);
				setTimeout(function() {toggleLight(buttonColor);}, 500);
				break;
		}
	}

	function createCpuNextMove() {
		var randomButton = buttonColors[Math.floor(Math.random() * 4)];
		computerPlayButtons.push(randomButton);
	}	

	function playCpuMoves(){
		computerPlayButtons.map(function(computerPlayButton){
			activateButton(computerPlayButton);
		});
		playCount = 0;
	}

	function checkRound(playCount) {
		if(checkUserPlay(playCount)) {
			console.log('correct!');
			playCount++;
			if (playCount >= computerPlayButtons.length) {
				playCount = 0;
				createCpuNextMove();
				playCpuMoves();
			} else checkRound(playCount);
		} else {
			console.log('wrong...wrong..');
			playCpuMoves();
		}
		function checkUserPlay (playCount) {
			return computerPlayButtons[playCount] === userPlayButtons[playCount] ? true : false;
		}
	}

	function startGame() {
		computerPlayButtons = [];
		userPlayButtons = [];
		createCpuNextMove();
		playCpuMoves();
	}

	$('.game-button').on('click', function(e){
		var buttonColor = e.target.id;
		
		activateButton(buttonColor);
		userPlayButtons.push(buttonColor);

		checkRound(playCount);

		console.log('player moves: ' + userPlayButtons);
	});

	$('.start-button').on('click', function(){
		startGame();
	});

})();