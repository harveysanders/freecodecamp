$( document ).ready(function(){
	// openweathermap API key f72072bc6ca76dc1e714af2a7585f56a
	var weatherBgImg,
		currTempF,
		showingMetric,
		$weatherIcon
		;

	currTempF = null;
	showingMetric = false;

	weatherBgImg = {
		normal: 'https://static.pexels.com/photos/7763/pexels-photo.jpg',
		thunderstorm: 'https://static.pexels.com/photos/799/city-lights-night-clouds.jpg',
		rain: 'https://static.pexels.com/photos/1553/glass-rainy-car-rain.jpg',
		drizzle: 'https://static.pexels.com/photos/896/city-weather-glass-skyscrapers.jpg',
		snow: 'https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg',
		atmosphere: 'https://static.pexels.com/photos/6718/mountains-clouds-forest-trees.jpg',
		clouds: 'https://static.pexels.com/photos/215/road-sky-clouds-cloudy.jpg'
	};
	
	$.getJSON('http://www.telize.com/geoip?callback=?',
		function(geoIpData){
			var city = encodeURI(geoIpData.city);

			$.ajax({
				method: 'GET',
				url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&mode=json&units=imperial&APPID=f72072bc6ca76dc1e714af2a7585f56a',
				success: function(weather_data){
					displayWeather(weather_data);
				}
			});

		});
	

	function displayWeather(data){
		$weatherIcon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
		currTempF = data.main.temp;

		$('.bg').css('background-image', 'url(' + getBgImgUrl(data) + ')');
		$('.temp').empty().append($weatherIcon, data.main.temp + '&deg; F');
		$('.city').html(data.name + ', ' + data.sys.country);
		$('.weather-desc').html(data.weather[0].description);
		$('.wind-speed').html(degToCompass(data.wind.deg) + ' ' + mpsToKnots(data.wind.speed) + ' knots');

	}

	function getBgImgUrl(data){

		function getIdMeaning(id) {
			if (id < 300) {
				return 'thunderstorm';
			} else if (id < 500) {
				return 'drizzle';
			} else if (id < 600) {
				return 'rain';
			} else if (id < 700) {
				return 'snow';
			} else if (id < 800) {
				return 'atmosphere';
			} else if (id < 900){
				return 'clouds';
			} else {
				return 'normal';
			}
		}

		return weatherBgImg[getIdMeaning(data.weather[0].id)];
	}
	

	function degToCompass(num) {
		var degreeSection = Math.floor((num/22.5) + 0.5);
		var directions = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
		return directions[degreeSection % 16];
	}

	function mpsToKnots(mps) {
		return (mps * 1.943844).toFixed(2);
	}

	function showMetric(){
		currTempC = (currTempF - 32) * 5/9;
		$('.temp').empty().append($weatherIcon, currTempC.toFixed(1) + '&deg; C');
		$('.celsius-fahrenheit').html('Show Fahrenheit');
		showingMetric = true;
	}

	function showImperial(){
		$('.temp').empty().append($weatherIcon, currTempF.toFixed(1) + '&deg; F');
		$('.celsius-fahrenheit').html('Show Celsius');
		showingMetric = false;
	}

	$('.celsius-fahrenheit').on('click', function(){
		if (showingMetric) {
			showImperial();
		} else {
			showMetric();
		}

	});

});