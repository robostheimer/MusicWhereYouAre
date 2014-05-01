//Music Objects from JSON Feed

function Music()
{
	
}
Music.prototype.artist='';
Music.prototype.title='';
Music.spotify = '';

			///songsList Object - child of the Music Object created above
			function songsList()
			{
			Music.call(songsList);
			}
			songsList.prototype = new Music();
			songsList.prototype.constructor = songsList;
			songsList.prototype.handleIt = function(url){;
			$.getJSON(url, function(response)
				{ 
					var song_str='';
					//console.log(song_str);
					for(var i=0; i<response.response.songs.length; i++)
					{
					
					if (!song_str.replace(/\W/g, '').match(response.response.songs[i].title.replace(/\W/g, '')))
						{	
						song_str += response.response.songs[i].title+':'+i;
						//console.log(song_str)
						var jsongs= new songsList();
						
						jsongs.artist =response.response.songs[i].artist_name;
						jsongs.title = response.response.songs[i].title;
						jsongs.spotify = response.response.songs[i].tracks[0].foreign_id.split(':')[2];
						$('#song_holder').append(jsongs.artist +': <a href="http://open.spotify.com/track/'+jsongs.spotify+'">'+jsongs.title+'</a> (id: '+jsongs.spotify+')<br>');
						}	
					}
				});
														  };
			
			
			
			
			//artistsList Object - child of the Music Object created above
			function artistsList()
			{
			Music.call(artistsList);	
			}
			artistsList.prototype = new Music();
			artistsList.prototype.constructor = artistsList;
			artistsList.prototype.title=[];
			artistsList.prototype.articles = [];///urls, date, name, summary
			artistsList.prototype.video =[]; ////titles, urls,
			artistsList.prototype.images = images=[]; ///url;
			artistsList.prototype.bio = [];//text, site(7digital), attribution-url
			artistsList.prototype.location = [];//=  artist, songs, spotify url
			
			artistsList.prototype.handleIt=function(url){;
			//console.log('handling');
				$.getJSON(url, function(response)
				{ 
					var song_str='';
				//	console.log(song_str);
					for(var i=0; i<response.response.artists.length; i++)
					{
					
					
						
						//console.log(song_str)
						var jartists= new artistsList();
						
						jartists.artist =response.response.artists[i].name;
						jartists.title = response.response.artists[i].songs;
						jartists.spotify = response.response.artists[i].foreign_ids[0].foreign_id.split(':')[2];
			;
						console.log(jartists.spotify);
						jartists.video = response.response.artists[i].video;
						jartists.images = response.response.artists[i].images;
						jartists.articles = response.response.artists[i].news;
						jartists.bio = response.response.artists[i].biographies;
						jartists.location = response.response.artists[i].artist_location.location;
						var spot_title =[];
						$('#artist_holder').append('<h2>'+jartists.artist+'</h2> from '+jartists.location);
						for (var e = 0; e<jartists.bio.length; e++)
						{
							if(jartists.bio[e].site=='last.fm')
							{
							var bio_site = jartists.bio[e].site;
							var bio_text = jartists.bio[e].text;
							var bio_url = jartists.bio[e].url;
							
							$('#artist_holder').append('<h4>Biography</h4><p style="float:right;padding:15px;margin:15px;margin-top:25px;border:1px solid #ccc"><img  src="'+jartists.images[3].url+'" height="300"></p><p style="font-size:8px">Biography courtesy of <a href="'+bio_url+'" target="_blank">'+bio_site+'</a></p><p>'+bio_text+'</p>');
							}
						}5
						
						$('#artist_holder').append('<h4>Top Songs (<a href="https://open.spotify.com/artist/'+jartists.spotify+'" target="_blank">Listen to '+jartists.artist+' on Spotify</a>)</h4><div id="songs"></div>');
						for(var a=0; a<jartists.title.length; a++)
						{
						////Create another class to grab the spotify id using spotify REST API
						var title =jartists.title[a].title;
						spot_title.push(title+'+'+jartists.artist);
						
						$('#artist_holder').append('<div style="clear:both"></div>');
						}
						var spotify = new Spotify();
						spotify.handleIt(spot_title);
						
						
						$('#artist_holder').append('<h4>Photos</h4>');
						
						for(var c=0; c<jartists.images.length; c++)
						{
							if(jartists.images[c].url.match('last.fm'))
							{
							var img_url=jartists.images[c].url;
								
								
									$('#artist_holder').append('<div class="images" style="float:left;  margin-right:15px;max-width:200px;overflow:hidden"><img style="border: 1px solid #ccc;" height="200" src="'+img_url+'"></div>');			
								
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
						for (var d=0; d<10; d++)
						{
							var article_url=jartists.articles[d].url;
							var article_name = jartists.articles[d].name;
							var article_summary = jartists.articles[d].summary;
							$('#artist_holder').append('<li><div><a href="'+article_url+'" target+"_blank">'+article_name+'</a><div><div>'+article_summary+'</div></li>');
						}
						
						
						
						
							
					}
					//console.log(jartists);
				});		
			};
			
			
			
			///similarArtists Object - child of the Music Object created above
			function similarArtists()
			{
			Music.call(artistsList)	;
			}
			similarArtists.prototype = new Music();
			similarArtists.prototype.constructor = similarArtists;
			similarArtists.prototype.handleIt=function(url){
			//console.log('handling');
				$.getJSON(url, function(response)
				{ 
					var song_str='';
					//console.log(song_str);
					$('#similar_holder').append('<h4>Similar Artists</h4>');
					for(var i=0; i<response.response.artists.length; i++)
					{
					
					
						
						//console.log(song_str)
						var jartists= new similarArtists();
						
						jartists.artist =response.response.artists[i].name;
						//jartists.title = response.response.artists[i].songs;
						jartists.spotify = response.response.artists[i].foreign_ids;
						//jartists.video = response.response.artists[i].video;
						jartists.images = response.response.artists[i].images;
						//jartists.articles = response.response.artists[i].news;
						//jartists.bio = response.response.artists[i].biographies;
						//console.log(jartists.artist);
						
						
						
						var img_url = '';
						var new_url = similar.url.split('name=')[0]+'name='+jartists.artist.replace(/ /g,'_')+'&results=1&bucket=songs&bucket=biographies&bucket=id:spotify-WW&bucket=images&bucket=video&bucket=news&bucket=artist_location';
						new_url = new_url.replace('similar?api_key=3KFREGLKBDFLWSIEC&format=json&','search?api_key=3KFREGLKBDFLWSIEC&format=json&');
						//console.log(new_url);
						for(var c=0; c<jartists.images.length; c++)
						{
							if(img_url=="")
							{
							var img_url=jartists.images[c].url;
							
							
							$('#similar_holder').append('<div id="'+jartists.artist.replace(/ /g,'_')+'" class="images_sim" style="float:left;max-width:100px; overflow:hidden; margin-right:15px;"><div><h6><a style="cursor:pointer" ">'+jartists.artist+'</a></h6></div><div><a style="cursor:pointer" "><img height="100" src="'+img_url+'"></a></div></div>');
							}
						}
						
							
					}
					
						$('.images_sim').click( 
						function()
						{
							var id=$(this).attr('id');
							
							var url = similar.url.split('name=')[0]+'name='+id+'&results=1&bucket=songs&bucket=biographies&bucket=id:spotify-WW&bucket=images&bucket=video&bucket=news&bucket=artist_location';
							url = url.replace('similar?api_key=3KFREGLKBDFLWSIEC&format=json&','search?api_key=3KFREGLKBDFLWSIEC&format=json&');
							runArtistSearch(url, id);	
						
							
						})	;
		
					

				});
						
			};
			
	
			
function Spotify()
{
	
	
}
Spotify.prototype.aritst ='';
Spotify.prototype.song_str='';
Spotify.prototype.handleIt = function(songArr)
{
	var song_str='';
	var spot_url ='';
	for(var x=0; x<songArr.length; x++)
	{
	$.getJSON('http://ws.spotify.com/search/1/track.json?q='+songArr[x], function(response)
				{ 
					;
					
					
								
						if (!song_str.replace(/\W/g, '').match(response.tracks[0].name.replace(/\W/g, '')))
							{	
							
							song_str+= response.tracks[0].name[0]+':';
							//console.log(song_str)
							spot_url=response.tracks[0].href.replace('spotify:track:','');
							$('#songs').append('<div style="float:left; max-width:300px; margin-right:15px;"><iframe theme="light" view="coverart"src="https://embed.spotify.com/?uri=spotify:track:' + spot_url + '" frameborder="0" allowtransparency="true" height="100" width="300"></iframe></div>')
							
							}
					
						if(spot_url.split(',').length-1==songArr.length)
						{
							$('#songs').append('');
						}
					
					
				});	
				
	}
			
};
/////Click Function to allow page to similar artists to populate///////

function runArtistSearch(url, artist)
{
	
$('#similar_holder').html('');
$('#artist_holder').html('');
new_artist = new artistsList();
new_artist.url = url;
artists.handleIt(new_artist.url);

var new_similar = new similarArtists()

new_similar.url = 'http://developer.echonest.com/api/v4/artist/similar?api_key=3KFREGLKBDFLWSIEC&format=json&name='+artist+'&results=10&&bucket=id:spotify-WW&bucket=images'
similar.handleIt(new_similar.url)
}