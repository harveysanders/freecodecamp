(function(){
	var usernames = ["freecodecamp", "MedryBW", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", 'brunofin', 'comster404', 'biscuits5161'];
	var channels = [];
	var filteredChannels = [];
	var $searchInput = $('.search-input input');
	// clientID a48m3cmx0f6ckhcz1vcgsm67157eytm
	
	// could be helpful
	// http://www.apaxsoftware.com/2012/05/common-javascript-mistakes-loops-and-callbacks/


	usernames.map(function(username){
		$.get('https://api.twitch.tv/kraken/channels/' + username, function(channel){
			channels.push(channel);
			handleNavButton('all');
		}).fail(function(){
			channels.push({'error':'error'});
		});
	});
		
	function createUserListItem(channel){
		if (channel.error === 'error') {
			channel.logo = 'https://s3.amazonaws.com/rapgenius/oops-my-bad.jpg';
			channel.display_name = 'User Not Found.';
			channel.url = '#';
		}
		var streamStatus = '';
		var statusIcon = '<i class="fa fa-exclamation-circle"></i>';
		var userLogo = channel.logo ? channel.logo : 'https://queue.speeddemosarchive.com/static/sda/twitch.png';
		var isStreaming = channel.status ? true : false;

		if (isStreaming){
			streamStatus = channel.status;
			statusIcon = '<i class="fa fa-check-circle"></i>';
		}

		var $userListItem;
		$userListItem = $('<div>', {
			'class': 'user-item',
			html: '<img src="' + userLogo + '"/><div class="user-info">' +
			'<a href="' + channel.url + '">' + '<header>' + channel.display_name + '</header></a>' +
			'<span class="stream-details">' + streamStatus + '</span></div>' +
			'<div class="is-streaming">' + statusIcon + '<div>'
		});
		return $userListItem;
	}

	function displayList(channels){
		$('.user-list').empty();
		$('.user-list').append(channels);
	}

	function handleNavButton(navButtonClass){
		filteredChannels = channels;
		$('.' + navButtonClass + 'a').css('color', '#E6E57D');

		if (navButtonClass === 'online'){
			filteredChannels = channels.filter(function(channel){
				return channel.status !== null;
			});
		} else if (navButtonClass === 'offline') {
			filteredChannels = channels.filter(function(channel){
				return channel.status === null;
			});
		}

		var itemsToDisplay = filteredChannels.map(function(channel){
			return createUserListItem(channel);
		});

		displayList(itemsToDisplay);
	}

	function search(query){
		console.log(query);

	}

	$('.nav li').on('click', function(event){
		handleNavButton(event.currentTarget.className);
	});

	$searchInput.on('input', function(){ //'change' only works when input loses focus.
		search($searchInput.val());
	});

})();