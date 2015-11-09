(function(){

	var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

	var buttonColors = ['green-button', 'red-button', 'yellow-button', 'blue-button'];
	var computerPlayButtons = [];
	var userPlayButtons = [];


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

	function playCompNextMove() {
		var randomButton = buttonColors[Math.floor(Math.random() * 4)];
		computerPlayButtons.push(randomButton);
		computerPlayButtons.map(function(computerPlayButton){
			activateButton(computerPlayButton);
		});
	}

	function checkUserPlay () {

	}

	function startGame() {
		computerPlayButtons = [];
		userPlayButtons = [];
		playCompNextMove();
	}

	$('.game-button').on('click', function(e){
		activateButton(e.target.id);
		userPlayButtons.push(e.target.id);

		checkUserPlay();

		console.log('CPU moves: ' + computerPlayButtons);
		console.log('player moves: ' + userPlayButtons);
	});

	$('.start-button').on('click', function(){
		startGame();
	});

})();