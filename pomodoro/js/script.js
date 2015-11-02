$( document ).ready(function(){
	var breakTime,
		sessionTime,
		start,
		elapsed,
		timer,
		onBreak,
		isPaused,
		timeRemaining,
		timerSound,
		
		$breakTime,
		$sessionTime,
		$timer,
		$pomodoro
		;

	breakTime = 5;
	sessionTime = 0.2;
	onBreak = false;
	isPaused = false;

	timerSound = new Audio('http://www.pdsounds.org/audio/download/763/appear.mp3');

	$breakTime = $('#breakTime');
	$sessionTime = $('#sessTime');
	$timer = $('#timer');
	$pomodoro = $('#pomodoro');

	$('#setBreak > .minus').on('click', function(){
		breakTime > 0 ? breakTime -- : breakTime = 0;
		$breakTime.html(breakTime);
		updateTimerDisplay();
	});
	$('#setBreak > .plus').on('click', function(){
		breakTime ++;
		$breakTime.html(breakTime);
		updateTimerDisplay();
	});
	$('#setSession > .minus').on('click', function(){
		sessionTime > 0 ? sessionTime -- : sessionTime = 0;
		$sessionTime.html(sessionTime);
		updateTimerDisplay();
	});
	$('#setSession > .plus').on('click', function(){
		sessionTime ++;
		$sessionTime.html(sessionTime);
		updateTimerDisplay();
	});
	$pomodoro.on('click', function(){
		if (timer) {
			clearInterval(timer);
			timer = null;
			$('button').prop('disabled', false);
		} else if(timeRemaining > 1000){
			var timeAtBreak = timeRemaining / 60000;
			onBreak ? startBreakTimer(timeAtBreak) : startSessionTimer(timeAtBreak);
		}else {
			onBreak ? startBreakTimer(breakTime) : startSessionTimer(sessionTime);
			$('button').prop('disabled', true);
		}
		
	});

	function updateTimerDisplay(){
		onBreak ? $timer.html(breakTime) : $timer.html(sessionTime);
	}
	function startSessionTimer(minutes){
		onBreak = false;
		$('.timer-type').html('Session');
		$pomodoro.css('border', '2px solid #569900');
		var percentComplete;
		var startTime = new Date().getTime();
		var countDownFrom = minutes * 60000;
		timer = setInterval(function(){
			var timeSinceStart = new Date().getTime() - startTime;
			timeRemaining = countDownFrom - timeSinceStart;
			percentComplete = 1-(timeRemaining / countDownFrom);
			$pomodoro.css('background', 'linear-gradient(0deg, #569900 '+ (percentComplete * 100) +'%, rgba(0,0,0,0) 0%)');
			
			var min = Math.floor(timeRemaining/60000);
			var sec = Math.floor((timeRemaining/1000) % 60);
			
			if (sec < 10) {sec = '0' + sec;}
			$timer.html(min + ':' + sec);

			if (timeRemaining < 0){
				timerSound.play();
				$timer.html('0:00');
				clearInterval(timer);
				startBreakTimer(breakTime);
			}			
		},1000);

	}

	function startBreakTimer(minutes){
		onBreak = true;
		$('.timer-type').html('Break');
		$pomodoro.css('border', '2px solid #990000');
		var percentComplete;
		var startTime = new Date().getTime();
		var countDownFrom = minutes * 60000;
		timer = setInterval(function(){
			var timeSinceStart = new Date().getTime() - startTime;
			timeRemaining = countDownFrom - timeSinceStart;
			percentComplete = 1-(timeRemaining / countDownFrom);
			$pomodoro.css('background', 'linear-gradient(0deg, #880000 '+ (percentComplete * 100) +'%, rgba(0,0,0,0) 0%)');

			var min = Math.floor(timeRemaining/60000);
			var sec = Math.floor((timeRemaining/1000) % 60);

			if (sec < 10) {sec = '0' + sec;}
			$timer.html(min + ':' + sec);

			if (timeRemaining < 0){
				timerSound.play();
				$timer.html('0:00');
				clearInterval(timer);
				startSessionTimer(sessionTime);
			}			
		},1000);
	}
	
	function disableUI(){
		$('button').disabled = true;
	}

	//initialize view
	$breakTime.html(breakTime);
	$sessionTime.html(sessionTime);
	$('.timer-type').html('Session');
	$timer.html(sessionTime);

});		