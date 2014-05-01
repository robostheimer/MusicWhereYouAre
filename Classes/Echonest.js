function EchonestJSON(arr, multiple)
			{
				this.lat_min = LatLongMin(DoubleSplitter(arr.toString(),',',':', 0, 0), multiple);
				this.lat_max =lat_max = LatLongMax(DoubleSplitter(arr.toString(),',',':', 0, 1), multiple);
				this.long_min =long_min = LatLongMin(DoubleSplitter(arr.toString(),',',':', 1, 0), multiple);
				this.long_max = LatLongMax(DoubleSplitter(arr.toString(),',',':', 1, 1), multiple);
				this.url ="http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&" + map.style + "results=87&min_latitude=" + this.lat_min + "&max_latitude="+ this.lat_max+ "&min_longitude="+this.long_min+"&max_longitude="+this.long_max+"&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance"
						
				this.handler = 				
					$.getJSON(this.url, function responder(response){
					/////Checks to see if the response is empty; if so, it adds a message to the UI	
					if (response == null || response.response.songs.length == 0) {
					addError();
					}
					/////Checks to see if there are less than 100 songs at a current location; if so, it calls another EchonestJSON variable that ups the multiple of the min and max latitudes
					if(response.response.songs.length<80)
					{
						var moreEcho = new EchonestJSON(echo.arr, multiple+.25);
					}
					
					else
					{

						var songs =response.response.songs;
						var markers = [];
						var spot_Arr=[];
						var songs_str='';
						var p=[];
						var info=[];
						var lat_long_str='';
						var containArr =[];
						var titleArr =[];
						var artistArr=[];
						var spotArr=[];
						var spot_Arr=[];
						var locationArr=[];
						var title=[];
						for(var i=0; i<songs.length; i++)
						{
						titleArr[i] = songs[i].title;	
						artistArr[i] = songs[i].artist_name;
						spotArr[i] =  songs[i].tracks[0].foreign_id.split(':')[2];	
						locationArr[i] = songs[i].artist_location;	
						
						
						/////first part of conditional check to see if iterated songArr.title isn't already add to the app;  if this is true, it adds the song; 
						////second part of conditionalsometimes titles, spotify ids or artists aren't listed in the data; this cleans it
						if (!cleanStr(songs_str, /\W/g).match(cleanStr(titleArr[i], /\W/g))){
							if(titleArr[i] == null || locationArr[i] == null || spotArr[i] == null) {
									i = i + 1;
						
						}
						else {
									songs_str += titleArr[i] + ':' + i;
									//map.fusion_songs_str += response.response.songs[i].title.replace(/\W/g, ' ') + ',';
									//var fusion_artist_str += cleanStr(artistArr[i], /\W/g)+',';
									var lat = locationArr[i].latitude;
									var long = locationArr[i].longitude;
									var city = locationArr[i].location.split(',')[0] + ',' + locationArr[i].location.split(',')[1];
									var spot_str = spotArr[i];
									spot_Arr.push(spotArr[i]);
									//////////////////////////Checks to see if the song is in the localStorage/Favorites;  if it is it fills in the star for that song and adds a red background/////////////////////////////////
									
									////////////////For the InfoWindows////////////////////
									for (var n = 0; n < localStorage.length; n++) {
										var spot_link =cleanStr(DoubleSplitter(localStorage.getItem('key_song'+n), '$$','**', 1, 0), /"}/g );
										
										
										///Note uses "onclick" attribute instead of clickhandler because of the way the InfoWindow object works in Google Maps
										if (spot_link == spotArr[i]) {
											info.push(city + '$$' + lat + '&&' + long + '%%<p class="info" id="infobox_pinfo' + i + '">' + titleArr[i] + '<br/>by ' + cleanStr(artistArr[i], /\+/g,'&#43;') + '</p><div class="border"><a href="http://open.spotify.com/track/' + spotArr[i] + '" target="_blank"><div class="spot_link" " aria-hidden="true" data-icon="c" id="infobox_spot_link' + i + '"></div></a><a><div onclick="addFavorite($(this).attr(\'id\'),$(this).attr(\'title\'))" class="spot_link infob favorite favorite_on" id="infobox_favorite' + i + '" title="' +spotArr[i] + '" aria-hidden="true" data-icon="t"></div></a><a><div onclick=addInfo($(this).attr(\'id\')); style="font-size:20px" class="spot_link information" id="infobox_info' + i + '" " aria-hidden="true" data-icon="*"></div></a><div class="clear_border""></div></div>>');
										}
									}
									///Note uses "onclick" attribute instead of clickhandler because of the way the InfoWindow object works in Google Maps
										if (!info.toString().match(spotArr[i])) {
										info.push(city + '$$' + lat + '&&' + long + '%%<p class="info" id="infobox_pinfo' + i + '">' + titleArr[i] + '<br/>by ' + cleanStr(artistArr[i], /\+/g,'&#43;') + '</p><a href="http://open.spotify.com/track/' +spotArr[i] + '" target="_blank"><div class="spot_link" " aria-hidden="true" data-icon="c" id="infobox_spot_link' + i + '"></div></a><a><div onclick="addFavorite($(this).attr(\'id\'),$(this).attr(\'title\'))" class="spot_link infob favorite" id="infobox_favorite' + i + '" title="' + spotArr[i] + '"  aria-hidden="true" data-icon="u"></div></a><a ><div onclick=addInfo($(this).attr(\'id\')); style="font-size:20px" class="spot_link information" id="infobox_info' + i + '" " aria-hidden="true" data-icon="*"></div></a><div class="clear_border";"></div>');
									}
								
								/////////////////////////////////For the Playlist Window//////////////////////
								
								p.push('<div  class="gray" id="song_spot' + i + '"><p class="info" id="pinfo' + i + '">' + titleArr[i] + '<br/>by ' + cleanStr(artistArr[i], /\+/g,'&#43;')  + '</p><a href="http://open.spotify.com/track/' + spotArr[i] + '" target="_blank"><div class="spot_link_spot" id="spot' + i + '" style="margin-left:5px;font-size:27px;"  aria-hidden="true" data-icon="c"></div></a><a><div id="favorite' + i + '" class="spot_link favorite" title="' + spotArr[i] + '" aria-hidden="true" data-icon="u"></div></a><a><div style="font-size:25px" id="info' + i + '" class="spot_link information"  aria-hidden="true" data-icon="*"></div></a><div style="clear:both;margin-bottom:-15px;"></div></div>');	
								}
								
							}	
								
								/////////////////////ClickHandlers//////////////////////////
								
								
								
								
					}
						/////////////////////////Checks to see if mobile browser;  if not adds spotify embed; otherwise it does not (Spotify's mobile app doesn't work with this type of playlist)
						if (jQuery.browser.mobile == false && !navigator.userAgent.match('iPad')) {
							$('#spot_holder').append('<iframe theme="light" view="coverart"src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:' + spot_Arr.toString() + '" frameborder="0" allowtransparency="true" height="80" width="300"></iframe>' + p.toString().replace(/<\/div>,/g, '</div>'));
							$('#genre_holder, #fav_holder, #spot_holder, #info-area').css({
								'width' : '305px'
							});
						} else {
							$('#spot_holder').append(map.p.toString().replace(/<\/div>,/g, '</div>'))
							$('#genre_holder, #fav_holder, #spot_holder, #info-area').css({
								'width' : '300px'
							});
						}
						info.sort();
						
						
						////////Preparing for Map;  lat_long_str is passed to the map object to add the compass/musical notes to the map///////////////
						for (var r = 0; r < info.length; r++) {
							
							/////checks to see if current lat/long pair exists, if it doesn't it adds it to the lat_long_str and contain arr;
							if (!lat_long_str.match(info[r].split('$$')[1].split('&&')[0] + info[r].split('&&')[1].split('%%')[0])) {

								lat_long_str += info[r].split('$$')[1].split('&&')[0] + info[r].split('&&')[1].split('%%')[0] + ':'
								containArr.push('@@' + info[r])
							} 
							////////////////////if lat long does exist; it is not added to the lat_long_str; just the containArr;
							else {
								containArr.push(info[r].split('%%')[1]);
							}
						}
						var arrStr = containArr.toString();
						//console.log(arrStr)
						var arrStrArr = arrStr.split('@@');
						for (var x = 1; x < arrStrArr.length; x++) {

							markers.push(arrStrArr[x].split('&&')[0].split('$$')[1] + ':' + arrStrArr[x].split('%%')[0].split('&&')[1]);
							title.push('<p><b>' + arrStrArr[x].split('$$')[0].replace(',undefined', '') + '</b></p>' + arrStrArr[x].split('%%')[1].replace(/<\/p>,/g, '</p>'));
						}
						
						
						var lat_avg = calculateAverage(arr[0]);
						var long_avg = calculateAverage(arr[1]);
						//////////////////////Initialize the map///////////////////
						initialize(markers, title, lat_avg, long_avg);
					
					
					$('.favorite').click(function(e)
					{
						
						var star = e.currentTarget;
						alert(star);
						id=$(this).attr('id');
						title=$(this).attr('title');
						addFavorite(id,title);
					});
				
				
				$('.spot_link').click(function()
					{
						id=$(this).attr('id');

						addInfo(id);^
					});	
				$('.spot_link').click(function()
					{
						id=$(this).attr('id');

						addInfo(id);
					});
					}
				});				
		};





			
/*
function loadJSON(arr) {

			///calculated for centering of the map;
			var lat_avg = calculateAverage(arr[0]);
			var long_avg = calculateAverage(arr[1]);
			
			var lat_min = LatLongMin(DoubleSplitter(arr.toString(),',',':', 0, 0), .5);
			var lat_max = LatLongMax(DoubleSplitter(arr.toString(),',',':', 0, 1), .5);
			var long_min = LatLongMin(DoubleSplitter(arr.toString(),',',':', 1, 0), .5);
			var long_max = LatLongMax(DoubleSplitter(arr.toString(),',',':', 1, 1), .5);
			//var songloader = new EchonestJSON('http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&" + map.style + "results=100&min_latitude=" + lat_min + "&max_latitude=" + lat_max + "&min_longitude=" + long_min + "&max_longitude=" + long_max + "&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance');
			
	
			
				$.getJSON("http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&" + map.style + "results=100&min_latitude=" + lat_min + "&max_latitude=" + lat_max + "&min_longitude=" + long_min + "&max_longitude=" + long_max + "&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance", function(response) {
					
					if (response == null || response.response.songs.length == 0) {
						$('#map-canvas').html('<p style="margin:15px;">Add either a city and state abbreviation (Make sure to add a comma between the city and the State Abbreviation) or just the state abbreviation to the form above. Please check your spelling if you continue to receive this message.  For now, this project is only usable to find artist in the United States.</p>');

					} else {
						map. markers = []
						map.title = [];
						//map.artist = [];
						map.spot_Arr = [];
						map.songs_str = '';
						map.p = [];

						map.info = [];
						map.lat_long_str = "";
						//map.fusion_songs_str = '';
						//map.fusion_artist_str = '';
						map.containArr = [];
						for ( i = 0; i < response.response.songs.length; i++) {
							///////////////////////Start Here//////////////////////

							if (!map.songs_str.replace(/\W/g, '').match(response.response.songs[i].title.replace(/\W/g, ''))) {
								if (response.response.songs[i].title == null || response.response.songs[i].artist_location.location == null || response.response.songs[i].tracks == null) {
									i = i + 1;
								} else {
									map.songs_str += response.response.songs[i].title + ':' + i;
									//map.fusion_songs_str += response.response.songs[i].title.replace(/\W/g, ' ') + ',';
									map.fusion_artist_str += response.response.songs[i].artist_name.replace(/\W/g, ' ') + ',';
									map.lat = response.response.songs[i].artist_location.latitude;
									map.long = response.response.songs[i].artist_location.longitude;
									map.city = response.response.songs[i].artist_location.location.split(',')[0] + ',' + response.response.songs[i].artist_location.location.split(',')[1];
									map.spot_str = response.response.songs[i].tracks[0].foreign_id;
									map.spot = map.spot_str.split(':')[2]
									map.spot_Arr.push(map.spot_str.split(':')[2]);

									for (var n = 0; n < localStorage.length; n++) {
										var spot_link = localStorage.getItem(cleanStr(DoubleSplitter('key_song'+n, '$$','**', 1, 0), /"}/g));
										//console.log
										if (spot_link == map.spot) {
											map.info.push(map.city + '$$' + map.lat + '&&' + map.long + '%%<p class="info" id="infobox_pinfo' + i + '">' + response.response.songs[i].title + '<br/>by ' + response.response.songs[i].artist_name.replace(/\+/g, '&#43;') + '</p><div class="border"><a href="http://open.spotify.com/track/' + map.spot + '" target="_blank"><div class="spot_link" " aria-hidden="true" data-icon="c" id="infobox_spot_link' + i + '"></div></a><a><div class="spot_link infob favorite favorite_on" id="infobox_favorite' + i + '" title="' + map.spot + '" onclick="addFavorite($(this).attr(\'id\'),$(this).attr(\'title\'))" style="" aria-hidden="true" data-icon="t"></div></a><a ><div style="font-size:20px" onclick="addInfo($(this).attr(\'id\'))" class="spot_link information" id="infobox_info' + i + '" " aria-hidden="true" data-icon="*"></div></a><div style="clear:both; border-bottom: 1px dotted #ececec;margin-top:5px;"></div></div>>');
										}
									}
									if (!map.info.toString().match(map.spot)) {
										map.info.push(map.city + '$$' + map.lat + '&&' + map.long + '%%<p class="info" id="infobox_pinfo' + i + '">' + response.response.songs[i].title + '<br/>by ' + response.response.songs[i].artist_name.replace(/\+/g, '&#43;') + '</p><a href="http://open.spotify.com/track/' + map.spot + '" target="_blank"><div class="spot_link" " aria-hidden="true" data-icon="c" id="infobox_spot_link' + i + '"></div></a><a><div class="spot_link infob favorite" id="infobox_favorite' + i + '" title="' + map.spot + '" onclick="addFavorite($(this).attr(\'id\'),$(this).attr(\'title\'))" style="" aria-hidden="true" data-icon="u"></div></a><a ><div style="font-size:20px" onclick="addInfo($(this).attr(\'id\'))" class="spot_link information" id="infobox_info' + i + '" " aria-hidden="true" data-icon="*"></div></a><div style="clear:both; border-bottom: 1px dotted #ececec; margin-bottom:5px;margin-top:5px;"></div>');
									}

									//console.log(i);

									map.p.push('<div  class="gray" id="song_spot' + i + '"><p class="info" id="pinfo' + i + '">' + response.response.songs[i].title + '<br/>by ' + response.response.songs[i].artist_name.replace(/\+/g, '&#43;') + '</p><a href="http://open.spotify.com/track/' + map.spot + '" target="_blank"><div class="spot_link_spot" id="spot' + i + '" style="margin-left:5px;font-size:27px;"  aria-hidden="true" data-icon="c"></div></a><a><div id="favorite' + i + '" class="spot_link favorite" title="' + map.spot + '" aria-hidden="true" data-icon="u" onclick="addFavorite($(this).attr(\'id\'),$(this).attr(\'title\'))"></div></a><a><div style="font-size:25px" "onclick=addInfo($(this).attr(\'id\')); id="info' + i + '" class="spot_link information"  aria-hidden="true" data-icon="*"></div></a><div style="clear:both;margin-bottom:-15px;"></div></div>');

								}
							}
						
						}
						
								
						/////LOOP ENDS Here///////////
						
						
						if (jQuery.browser.mobile == false && !navigator.userAgent.match('iPad')) {
							$('#spot_holder').append('<iframe theme="light" view="coverart"src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:' + map.spot_Arr.toString() + '" frameborder="0" allowtransparency="true" height="80" width="300"></iframe>' + map.p.toString().replace(/<\/div>,/g, '</div>'));
							$('#genre_holder, #fav_holder, #spot_holder, #info-area').css({
								'width' : '305px'
							});
					
						} else {
							$('#spot_holder').append(map.p.toString().replace(/<\/div>,/g, '</div>'))
							$('#genre_holder, #fav_holder, #spot_holder, #info-area').css({
								'width' : '300px'
							});
						}
								
						map.info.sort()

						for (var r = 0; r < map.info.length; r++) {
							//console.log(map.info[r]);
							if (!map.lat_long_str.match(map.info[r].split('$$')[1].split('&&')[0] + map.info[r].split('&&')[1].split('%%')[0])) {

								map.lat_long_str += map.info[r].split('$$')[1].split('&&')[0] + map.info[r].split('&&')[1].split('%%')[0] + ':'
								map.containArr.push('@@' + map.info[r])
							} else {
								map.containArr.push(map.info[r].split('%%')[1]);
							}
						}
						var arrStr = map.containArr.toString();
						//console.log(arrStr)
						var arrStrArr = arrStr.split('@@');
						for (var x = 1; x < arrStrArr.length; x++) {

							map.markers.push(arrStrArr[x].split('&&')[0].split('$$')[1] + ':' + arrStrArr[x].split('%%')[0].split('&&')[1]);
							map.title.push('<p><b>' + arrStrArr[x].split('$$')[0].replace(',undefined', '') + '</b></p>' + arrStrArr[x].split('%%')[1].replace(/<\/p>,/g, '</p>'));
						}
						
						
						initialize(map.markers, map.title, lat_avg, long_avg);
						
					}
				});
				

				//loadSongsViaWiki();
			}*/