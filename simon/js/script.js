(function(){

	var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

	var buttonColors = ['green-button', 'red-button', 'yellow-button', 'blue-button'];
	var gameStarted = false;
	var computerPlayButtons,
		userPlayButtons,
		playCount,
		timeBetweenMoves
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
		//http://brackets.clementng.me/post/24150213014/example-of-a-javascript-closure-settimeout-inside
		setTimeout(function(){
			for (var i = 0; i <= computerPlayButtons.length; i++) {
		    	setTimeout((function(x) {
		    		return function() {
		    			activateButton(computerPlayButtons[x]);
		    		}; 
		    	})(i), timeBetweenMoves * i);
			}
		}, 800); //delay for CPU response
		
		console.log(computerPlayButtons);
	}

	function resetUser(){
		playCount = 0;
		userPlayButtons = [];
	}

	function checkRound(playCount) {
		if (checkUserPlay()) {
			console.log('correct!');
			if (playCount === computerPlayButtons.length) {
				createCpuNextMove();
				playCpuMoves();
				resetUser();
			}
		} else {
			console.log('wrong!');
			playCpuMoves();
			resetUser();
		}

		function checkUserPlay () {
			return computerPlayButtons[playCount-1] === userPlayButtons[playCount-1] ? true : false;
		}
	}

	function startGame() {
		computerPlayButtons = [];
		userPlayButtons = [];
		timeBetweenMoves = 1000;
		playCount = 0;

		//test
		// for (var i=0; i < 6; i++) {
		// 	createCpuNextMove();
		// }
		createCpuNextMove();
		playCpuMoves();
	}

	$('.game-button').on('click', function(e){
		var buttonColor = e.target.id;

		activateButton(buttonColor);
		userPlayButtons.push(buttonColor);
		playCount++;

		checkRound(playCount);

		console.log('player moves: ' + userPlayButtons);
	});

	$('.start-button').on('click', function(){
		startGame();
	});

	
	




})();