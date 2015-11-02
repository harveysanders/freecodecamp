(function(){
	// var $ = $;
	$.get('http://www.freecodecamp.com/news/hot', function ( posts ) {
		console.log(posts);
		posts.map(function(post){
			var photoURL = post.image === '' ? post.author.picture : post.image;
			var postTitle = post.headline;
			var postDate = new Date(post.timePosted).toString().split(' ').slice(0,4).join(' ');
			var discussLink = spaceToDash(post.storyLink);
			
			var $postPhoto = $('<a/>', {
				href: post.link,
				target: '_blank',
				html: $('<img>', {
					src: photoURL,
					'class': 'post-img'
				})
			});
			var $postDetails = $('<div/>').addClass('post-details text-left').html($('<ul/>', {
				'class': 'list-unstyled',
				html: '<li><a href="' + post.link + '" target="_blank">' + truncateString(postTitle, 30) + '</a></li>' + 
				'<li><a href="http://www.freecodecamp.com/' + post.author.username + '" target="_blank">by - ' + post.author.username + '</a></li>' +
				'<li><i class="fa fa-heart"></i> ' + post.upVotes.length +
				'<a href="http://www.freecodecamp.com/news/' + discussLink + '" target="_blank"><button class="btn btn-default btn-xs pull-right discuss-btn">Discuss</button></a></li>' +
				'<li>Posted on: ' + postDate + '</li>'
			}));
			var $post = $('<div/>').addClass('post');

			$post.append($postPhoto, $postDetails);
			$('.posts').append($post);

		});
	});

	function truncateString(str, cutoff) {
    var result = str.length > cutoff ? str.substring(0, cutoff-1) + '...' : str;
    return result;
	}

// ----------------- Need to fix to get 'discuss' links to work! ------------------
	function spaceToDash(str) {
		var result = str.replace(" ", "-");
	  return result;
	}

})();