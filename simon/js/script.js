(function(){

	var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

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

	function startGame() {
		var buttonColors = ['green-button', 'red-button', 'yellow-button', 'blue-button'];
		var selectedButtons = [];
		function playNextMove() {
			console.log('play started');
			var randomButton = buttonColors[Math.floor(Math.random() * 4)];
			selectedButtons.push(randomButton);
			console.log(selectedButtons);
			selectedButtons.map(function(selectedButton){
				activateButton(selectedButton);
			});
		}
		playNextMove();
	}

	$('.game-button').on('click', function(e){
		activateButton(e.target.id);
	});

	$('.start-button').on('click', function(){
		startGame();
	});

})();