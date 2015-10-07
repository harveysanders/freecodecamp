$( document ).ready(function(){
	var breakTime,
		sessionTime,
		start,
		elapsed,
		timer,
		onBreak,
		isPaused,
		
		$breakTime,
		$sessionTime,
		$timer,
		$pomodoro
		;

	breakTime = 5;
	sessionTime = 0.2;
	onBreak = false;
	isPaused = false;

	$breakTime = $('#breakTime');
	$sessionTime = $('#sessTime');
	$timer = $('#timer');
	$pomodoro = $('#pomodoro');

	$('#setBreak > .minus').on('click', function(){
		breakTime > 1 ? breakTime -- : breakTime = 1;
		$breakTime.html(breakTime);
	});
	$('#setBreak > .plus').on('click', function(){
		breakTime ++;
		$breakTime.html(breakTime);
	});
	$('#setSession > .minus').on('click', function(){
		sessionTime > 1 ? sessionTime -- : sessionTime = 1;
		$sessionTime.html(sessionTime);
		$timer.html(sessionTime);
	});
	$('#setSession > .plus').on('click', function(){
		sessionTime ++;
		$sessionTime.html(sessionTime);
		$timer.html(sessionTime);
	});
	$pomodoro.on('click', function(){
		if (timer) {
			clearInterval(timer);
			timer = null;
			$('button').prop('disabled', false);
		} else {
			onBreak ? startBreakTimer() : startSessionTimer();
			$('button').prop('disabled', true);
		}
		
	});


	function startSessionTimer(){
		onBreak = false;
		$('.timer-type').html('Session');
		var startTime = new Date().getTime();
		var countDownFrom = sessionTime * 60000;
		timer = setInterval(function(){
			var timeSinceStart = new Date().getTime() - startTime;
			var timeRemaining = countDownFrom - timeSinceStart;
			console.log(timeRemaining);
			var min = Math.floor(timeRemaining/60000);
			var sec = Math.floor((timeRemaining/1000) % 60);
			if (sec < 10) {sec = '0' + sec;}
			$timer.html(min + ':' + sec);

			if (timeRemaining < 0){
				$timer.html('0:00');
				clearInterval(timer);
				startBreakTimer();
			}			
		},1000);

	}

	function startBreakTimer(){
		onBreak = true;
		$('.timer-type').html('Break');
		var startTime = new Date().getTime();
		var countDownFrom = breakTime * 60000;
		timer = setInterval(function(){
			var timeSinceStart = new Date().getTime() - startTime;
			var timeRemaining = countDownFrom - timeSinceStart;
			var min = Math.floor(timeRemaining/60000);
			var sec = Math.floor((timeRemaining/1000) % 60);
			if (sec < 10) {sec = '0' + sec;}
			$timer.html(min + ':' + sec);

			if (timeRemaining < 0){
				$timer.html('0:00');
				clearInterval(timer);
				startSessionTimer();
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