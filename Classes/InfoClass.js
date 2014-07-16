//Music Objects from JSON Feed   Creates Music Class
function Music() {

}

Music.prototype.artist = '';
Music.prototype.title = '';
Music.spotify = '';

///songsList Object - child of the Music Object created above
function songsList() {
	Music.call(songsList);
}

songsList.prototype = new Music();
songsList.prototype.constructor = songsList;
songsList.prototype.handleIt = function(url) {;
	//console.log('handling');
	$.getJSON(url, function(response) {
		var song_str = '';
		//console.log(song_str);
		$('#song_holder').html('');
		for (var i = 0; i < response.response.songs.length; i++) {

			if (!song_str.replace(/\W/g, '').match(response.response.songs[i].title.replace(/\W/g, ''))) {
				song_str += response.response.songs[i].title + ':' + i;
				var jsongs = new songsList();

				jsongs.artist = response.response.songs[i].artist_name;
				jsongs.title = response.response.songs[i].title;
				jsongs.spotify = response.response.songs[i].tracks[0].foreign_id.split(':')[2];
				$('#song_holder').append(jsongs.artist + ': <a href="http://open.spotify.com/track/' + jsongs.spotify + '">' + jsongs.title + '</a> (id: ' + jsongs.spotify + ')<br>');
			}
		}

	});
};

//artistsList Object - child of the Music Object created above
function artistsList() {
	Music.call(artistsList);
}

artistsList.prototype = new Music();
artistsList.prototype.constructor = artistsList;
artistsList.prototype.title = [];
artistsList.prototype.articles = [];
///urls, date, name, summary
artistsList.prototype.video = [];
////titles, urls,
artistsList.prototype.images = images = [];
///url;
artistsList.prototype.bio = [];
//text, site(7digital), attribution-url
artistsList.prototype.location = [];
//=  artist, songs, spotify url

artistsList.prototype.handleIt = function(url) {;
	
	$.getJSON(url, function(response) {
		var song_str = '';
		console.log(response.response.artists[0]);
		for (var i = 0; i < response.response.artists.length; i++) {
			var jartists = new artistsList();
			jartists.artist = response.response.artists[i].name;
			jartists.title = response.response.artists[i].songs;
			jartists.spotify = response.response.artists[i].foreign_ids[0].foreign_id.split(':')[2];
			jartists.video = response.response.artists[i].video;
			jartists.images = response.response.artists[i].images;
			jartists.articles = response.response.artists[i].news;
			jartists.bio = response.response.artists[i].biographies;
			jartists.location = response.response.artists[i].artist_location.location;
			var spot_title = [];
			$('#artist_holder').html('');
			$('#artist_holder').append('<h2>' + jartists.artist + '</h2>')

			if (jartists.location.match('US')) {
				$('#artist_holder').append('from <a class="location_artist">' + jartists.location + '</a>');
			} else {
				$('#artist_holder').append('from ' + jartists.location);
			}

			for (var e = 0; e < jartists.bio.length; e++) {
				if (jartists.bio[e].site == 'last.fm') {
					var bio_site = jartists.bio[e].site;
					var bio_text = jartists.bio[e].text;
					var bio_url = jartists.bio[e].url
					if (bio_text.length > 2000) {
						bio_text = textSlicer(bio_text, 2000) + '... <a href="' + bio_url + '" target="_blank"">Read More</a>';
					} else {
						bio_text = bio_text;
					}
					if (bio_text == "") {
						$('#artist_holder').append('<p>No published Biography exists for this band.</p>');

					}

					var bio_url = jartists.bio[e].url;

					$('#artist_holder').append('<h4>Biography</h4><p class="intro"></p><p style="font-size:8px">Biography and photos courtesy of <a href="' + bio_url + '" target="_blank">' + bio_site + '</a></p><p>' + bio_text + '</p>');
				}
			}

			$('#artist_holder').append('<div style="clear:both"></div><h4>Top Songs (<a href="https://open.spotify.com/artist/' + jartists.spotify + '" target="_blank">Listen to ' + jartists.artist + ' on Spotify</a>)</h4><div id="songs"></div>');
			if (a == 0) {
				$('#artist_holder').append('<p>There are no songs for this band in the Spotify Library.</p>');
			} else {
				for (var a = 0; a < 8; a++) {
					////Create another class to grab the spotify id using spotify REST API
					var title = jartists.title[a].title;
					/*if(!cleanStr(song_str, /\W/g).match(cleanStr(title, /\W/g)))
					 {
					 song_str+= title +',';
					 console.log(spot_title);
					 spot_title.push(title+'+'+jartists.artist);
					 }*/

				}
				var spotify = new Spotify();
				spotify.handleIt(jartists.artist);
				$('#artist_holder').append('<div style="clear:both"></div>');
			}

			$('#artist_holder').append('<h4>Photos</h4>');

			if (c == 0) {
				$('#artist_holder').append('<p>There are no images in the Echonest Database of this band.</p>');
			} else {
				for (var c = 0; c < jartists.images.length; c++) {

					if (jartists.images[c].url.match('last.fm')) {
						if ($('p.intro').html() == "") {
							$('p.intro').append('<img src="' + jartists.images[c].url + '">')

						}
						var img_url = jartists.images[c].url;
						$('#artist_holder').append('<div class="images"><img class="gallery" src="' + img_url + '"></div>');
					}

				}
			}
			/*$('#artist_holder').append('<div style="clear:both"></div><h4>Videos</h4>');

			 for (var b=0; b<jartists.video.length; b++)
			 {
			 if(jartists.video[b].url.match('youtube'))
			 {
			 var video_title = jartists.video[b].title;
			 var video_url=jartists.video[b].url;
			 //console.log(video_url);
			 video_url = video_url.split('?v=')[1].split('&')[0];
			 }
			 $('#artist_holder').append('<div style="float:left; margin-right:15px;margin-bottom:15px;"><iframe width="250" height="141" src="//www.youtube.com/embed/'+video_url+'" frameborder="0" allowfullscreen></iframe></div>');
			 }*/
			$('#artist_holder').append('<div style="clear:both"></div><h4>Articles</h4>');
			if (d == 0) {
				$('#artist_holder').append('<p>There are no articles in the Echonest Database about this band.</p>');
			} else {

				if (jartists.articles.length > 10) {

					var articles_num = 10;

				} else {
					var articles_num = jartists.articles.length;
				}

				for (var d = 0; d < articles_num; d++) {
					
					var article_url = jartists.articles[d].url;
					var article_name = jartists.articles[d].name;
					var article_summary = jartists.articles[d].summary;
					$('#artist_holder').append('<li><div><a href="' + article_url + '" target+"_blank">' + article_name + '</a><div><div>' + article_summary + '</div></li>');
				}
			}

			$('.location_artist').click(function() {
				var hashed = jartists.location.split(',')[0] + '+' + cleanStr(jartists.location.split(',')[1], ' ', '');
				hashed = cleanStr(hashed, ' ', '_')
				window.location.hash = hashed
				$('#info-area').slideUp('slow');
			});
		}
		$('#artist_holder').append('<h4>Related Artists</h4>')

		var similar = new similarArtists();
		
		var artist_for_url = runUrlEncoder(jartists.artist);
		similar.url = 'http://developer.echonest.com/api/v4/artist/similar?api_key=3KFREGLKBDFLWSIEC&format=json&name=' + artist_for_url + '&results=10&&bucket=id:spotify-WW&bucket=images';
		similar.handleIt(similar.url);
	});
};

///similarArtists Object - child of the Music Object created above
function similarArtists() {
	Music.call(artistsList);
}

similarArtists.prototype = new Music();
similarArtists.prototype.constructor = similarArtists;
similarArtists.prototype.handleIt = function(url) {
	$.getJSON(url, function(response) {

		var song_str = '';
		$('#similarArtist').remove('')
		$('#artist_holder').append('<div id="similarArtists"></div>')
		if (response.response.length == 0) {
			$('#artist_holder').append('<div id="similarArtist">There are currently no similar artists listed for this band in the Echonest Database.</div>')
		}
		for (var i = 0; i < response.response.artists.length; i++) {

			//console.log(song_str)
			var jartists = new similarArtists();

			jartists.artist = response.response.artists[i].name;
			//jartists.title = response.response.artists[i].songs;
			jartists.spotify = response.response.artists[i].foreign_ids;
			//jartists.video = response.response.artists[i].video;
			jartists.images = response.response.artists[i].images;
			//jartists.articles = response.response.artists[i].news;
			//jartists.bio = response.response.artists[i].biographies;
			//console.log(jartists.artist);

			var img_url = '';
			var new_url = url.split('name=')[0] + 'name=' + jartists.artist.replace(/ /g, '_') + '&results=1&bucket=songs&bucket=biographies&bucket=id:spotify-WW&bucket=images&bucket=video&bucket=news&bucket=artist_location';
			new_url = new_url.replace('similar?api_key=3KFREGLKBDFLWSIEC&format=json&', 'search?api_key=3KFREGLKBDFLWSIEC&format=json&');
			//console.log(new_url);

			for (var c = 0; c < jartists.images.length; c++) {
				if (img_url == "") {
					var img_url = jartists.images[c].url;
					if (img_url.match('last.fm')) {
						var artist_for_url = runUrlEncoder(jartists.artist);

						$('#similarArtists').append('<div id="' + artist_for_url + '" class="images_sim"><img src="' + img_url + '"><div class="similar-headline">' + jartists.artist + '</div></div></div>');
					}
				}
			}

		}

		$('.images_sim').click(function() {
			$('#artist_holder').html('');

			var id = $(this).attr('id');
			id = runUrlEncoder(id);

			var url = 'http://developer.echonest.com/api/v4/artist/search?api_key=3KFREGLKBDFLWSIEC&format=json&name=' + id + '&results=1&bucket=songs&bucket=biographies&bucket=id:spotify-WW&bucket=images&bucket=video&bucket=news&bucket=artist_location';

			runArtistSearch(url, id);

		});

	});

};

function Spotify() {

}

Spotify.prototype.aritst = '';
Spotify.prototype.song_str = '';
Spotify.prototype.handleIt = function(artist) {
	var song_str = '';
	var spot_url = '';
	var spot_title = '';

	$.getJSON('http://ws.spotify.com/search/1/track.json?q=artist:' + runUrlEncoder(artist), function(response) {
		for (var i = 0; i < 10; i++) {
			if (!song_str.replace(/\W/g, '').match(response.tracks[i].name.replace(/\W/g, ''))) {

				song_str += response.tracks[i].name + ':';
				spot_title = response.tracks[i].name;
				spot_url = cleanStr(response.tracks[i].href, 'spotify:track:');
				$('#songs').append('<div class="spot_iframe"><iframe theme="light" view="coverart"src="https://embed.spotify.com/?uri=spotify:track:' + spot_url + '" frameborder="0" allowtransparency="true"  ></iframe><div class="spot_title">' + spot_title + '</div></div>');

			}
		}
	});
};

/////Click Function to allow page to similar artists to populate///////

function runArtistSearch(url, artist) {

	$('#similarArtist').html('');
	new_artist = new artistsList();
	new_artist.url = url;
	new_artist.handleIt(new_artist.url);

}