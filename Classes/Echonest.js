///////EchonestJSON Object used to load echonest JSON

function EchonestJSON(arr, multiple)
			{
			
				this.lat_min = LatLongMin(DoubleSplitter(arr.toString(),',',':', 0, 0), multiple);
				this.lat_max =lat_max = LatLongMax(DoubleSplitter(arr.toString(),',',':', 0, 1), multiple);
				this.long_min =long_min = LatLongMin(DoubleSplitter(arr.toString(),',',':', 1, 0), multiple);
				this.long_max = LatLongMax(DoubleSplitter(arr.toString(),',',':', 1, 1), multiple);
				map.style=map.style.replace(/%%%/g, '');
				this.url ="http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&" + map.style + "results=87&min_latitude=" + this.lat_min + "&max_latitude="+ this.lat_max+ "&min_longitude="+this.long_min+"&max_longitude="+this.long_max+"&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance"
						
				this.handler = 				
					$.getJSON(this.url, function responder(response){
					/////Checks to see if the response is empty; if so, it adds a message to the UI	
					
					if (response == null || response.response.songs.length == 0) {
					addError();
					}
					/////Checks to see if there are less than 80 songs at a current location; if so, it calls another EchonestJSON variable that ups the multiple of the min and max latitudes
					if(response.response.songs.length<80)
					{
						
						if((map_lat2 - map_lat1)>1||(map_long_2-map_long1))
						{
						var moreEcho = new EchonestJSON(map.map_range[0], multiple+.01);
						}
						else 
						{
							var moreEcho = new EchonestJSON(map.map_range[0], multiple+.1);
							
						}
						
						
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
						
						if (!cleanStr(songs_str, /\W/g).match(cleanStr(splitParans(titleArr[i]), /\W/g))){
							
							////second part of conditionalsometimes titles, spotify ids or artists aren't listed in the data; this cleans it
							if(titleArr[i] == null || locationArr[i] == null || spotArr[i] == null) {
									i = i + 1;
						
						}
						
						else if(!window.location.hash.replace('#','').match(/\+/g)&&(locationArr[i].location.match(map.state)||locationArr[i].location.match(map.stateAB))) 										{
							
									console.log(map.stateAB);
									
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
											info.push(city + '$$' + lat + '&&' + long + '%%<p class="info" id="infobox_pinfo' + i + '">' + titleArr[i] + '<br/>by ' + cleanStr(artistArr[i], /\+/g,'&#43;') + '</p><div class="border"><a href="https://embed.spotify.com/?uri=spotify:track:' + spotArr[i] + '" target="_blank"><div class="spot_link" " aria-hidden="true" data-icon="c" id="infobox_spot_link' + i + '"></div></a><a><div onclick="addFavorite($(this).attr(\'id\'),$(this).attr(\'title\'))" class="spot_link infob favorite favorite_on" id="infobox_favorite' + i + '" title="' +spotArr[i] + '" aria-hidden="true" data-icon="t"></div></a><a><div onclick=addInfo($(this).attr(\'id\')); style="font-size:20px" class="spot_link information" id="infobox_info' + i + '" " aria-hidden="true" data-icon="*"></div></a><div class="clear_border""></div></div>>');
										}
									}
									///Note uses "onclick" attribute instead of clickhandler because of the way the InfoWindow object works in Google Maps
										if (!info.toString().match(spotArr[i])) {
										info.push(city + '$$' + lat + '&&' + long + '%%<p class="info" id="infobox_pinfo' + i + '">' + titleArr[i] + '<br/>by ' + cleanStr(artistArr[i], /\+/g,'&#43;') + '</p><a href="https://embed.spotify.com/?uri=spotify:track:' +spotArr[i] + '" target="_blank"><div class="spot_link" " aria-hidden="true" data-icon="c" id="infobox_spot_link' + i + '"></div></a><a><div onclick="addFavorite($(this).attr(\'id\'),$(this).attr(\'title\'))" class="spot_link infob favorite" id="infobox_favorite' + i + '" title="' + spotArr[i] + '"  aria-hidden="true" data-icon="u"></div></a><a ><div onclick=addInfo($(this).attr(\'id\')); style="font-size:20px" class="spot_link information" id="infobox_info' + i + '" " aria-hidden="true" data-icon="*"></div></a><div class="clear_border";"></div>');
									}
								
								/////////////////////////////////For the Playlist Window//////////////////////
								
								p.push('<div  class="gray" id="song_spot' + i + '"><div class="close" id="close'+i+'" aria-hidden="true" data-icon="x"></div><p class="info" id="pinfo' + i + '">' + titleArr[i] + '<br/>by ' + cleanStr(artistArr[i], /\+/g,'&#43;')  + '</p><a class="spotter" href="http://open.spotify.com/track/' + spotArr[i] + '" target="_blank"><div class="spot_link_spot" id="spot' + i + '" style="margin-left:5px;font-size:27px;"  aria-hidden="true" data-icon="c"></div></a><a><div id="favorite' + i + '" class="spot_link favorite" title="' + spotArr[i] + '" aria-hidden="true" data-icon="u"></div></a><a><div style="font-size:25px" id="info' + i + '" class="spot_link information"  aria-hidden="true" data-icon="*"></div></a><div style="clear:both;margin-bottom:-15px;"></div></div>');	
								
								}
					else if(window.location.hash.replace('#','').match(/\+/g))
					{
									
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
											info.push(city + '$$' + lat + '&&' + long + '%%<p class="info" id="infobox_pinfo' + i + '">' + titleArr[i] + '<br/>by ' + cleanStr(artistArr[i], /\+/g,'&#43;') + '</p><div class="border"><a href="https://embed.spotify.com/?uri=spotify:track:' + spotArr[i] + '" target="_blank"><div class="spot_link" " aria-hidden="true" data-icon="c" id="infobox_spot_link' + i + '"></div></a><a><div onclick="addFavorite($(this).attr(\'id\'),$(this).attr(\'title\'))" class="spot_link infob favorite favorite_on" id="infobox_favorite' + i + '" title="' +spotArr[i] + '" aria-hidden="true" data-icon="t"></div></a><a><div onclick=addInfo($(this).attr(\'id\')); style="font-size:20px" class="spot_link information" id="infobox_info' + i + '" " aria-hidden="true" data-icon="*"></div></a><div class="clear_border""></div></div>>');
										}
									}
									///Note uses "onclick" attribute instead of clickhandler because of the way the InfoWindow object works in Google Maps
										if (!info.toString().match(spotArr[i])) {
										info.push(city + '$$' + lat + '&&' + long + '%%<p class="info" id="infobox_pinfo' + i + '">' + titleArr[i] + '<br/>by ' + cleanStr(artistArr[i], /\+/g,'&#43;') + '</p><a href="https://embed.spotify.com/?uri=spotify:track:' +spotArr[i] + '" target="_blank"><div class="spot_link" " aria-hidden="true" data-icon="c" id="infobox_spot_link' + i + '"></div></a><a><div onclick="addFavorite($(this).attr(\'id\'),$(this).attr(\'title\'))" class="spot_link infob favorite" id="infobox_favorite' + i + '" title="' + spotArr[i] + '"  aria-hidden="true" data-icon="u"></div></a><a ><div onclick=addInfo($(this).attr(\'id\')); style="font-size:20px" class="spot_link information" id="infobox_info' + i + '" " aria-hidden="true" data-icon="*"></div></a><div class="clear_border";"></div>');
									}
								
								/////////////////////////////////For the Playlist Window//////////////////////
								
								p.push('<div  class="gray" id="song_spot' + i + '"><div class="close" id="close'+i+'" aria-hidden="true" data-icon="x"></div><p class="info" id="pinfo' + i + '">' + titleArr[i] + '<br/>by ' + cleanStr(artistArr[i], /\+/g,'&#43;')  + '</p><a class="spotter" href="http://open.spotify.com/track/' + spotArr[i] + '" target="_blank"><div class="spot_link_spot" id="spot' + i + '" style="margin-left:5px;font-size:27px;"  aria-hidden="true" data-icon="c"></div></a><a><div id="favorite' + i + '" class="spot_link favorite" title="' + spotArr[i] + '" aria-hidden="true" data-icon="u"></div></a><a><div style="font-size:25px" id="info' + i + '" class="spot_link information"  aria-hidden="true" data-icon="*"></div></a><div style="clear:both;margin-bottom:-15px;"></div></div>');
						
					}
											
								
							}	
								
			
								
								
								
								
					}
						/////////////////////////Checks to see if mobile browser;  if not adds spotify embed; otherwise it does not (Spotify's mobile app doesn't work with this type of playlist)
						if (jQuery.browser.mobile == false && !navigator.userAgent.match('iPad')) {
							$('#spot_holder').append('<div id="iframe_holder"><iframe id="spot_frame" theme="light" view="coverart"src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:' + spot_Arr.toString() + '" frameborder="0" allowtransparency="true" height="80" width="300"></iframe></div>' + p.toString().replace(/<\/div>,/g, '</div>'));
							$('#genre_holder, #fav_holder, #spot_holder').css({
								'width' : '305px'
							});
						} else {
							$('#spot_holder').append(p.toString().replace(/<\/div>,/g, '</div>'))
							$('#genre_holder, #fav_holder, #spot_holder').css({
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
						
						var arrStrArr = arrStr.split('@@');
						for (var x = 1; x < arrStrArr.length; x++) {

							markers.push(arrStrArr[x].split('&&')[0].split('$$')[1] + ':' + arrStrArr[x].split('%%')[0].split('&&')[1]);
							title.push('<p><b>' + arrStrArr[x].split('$$')[0].replace(',undefined', '') + '</b></p>' + arrStrArr[x].split('%%')[1].replace(/<\/p>,/g, '</p>'));
						}
						
						
						var lat_avg = calculateAverage(arr[0]);
						var long_avg = calculateAverage(arr[1]);
						//////////////////////Initialize the map by calling instance of MAP Class///////////////////
						
						var mappy = new MAP(markers, title, lat_avg, long_avg);
						mappy.handle(markers, title, lat_avg, long_avg)
						
				///////////////////Favorite and info button click handlers///////////////////	
					$('.favorite').click(function()
					{
						id=$(this).attr('id');
						title=$(this).attr('title');
						addFavorite(id,title);
					});
					$('.close').click(function()
					{
					var id=$(this).attr('id');
					var parent = $('#'+ id).parent().attr('id');
					
					var spottersArr=[];
					$('#'+parent).remove();
					$('#spot_frame').remove();
					var spotters = $('.spotter');
					for(var p=0; p<spotters.length; p++)
					{
						var shref = spotters[p].href.replace('http://open.spotify.com/track/','');
						spottersArr.push(shref);
					}
					$('#iframe_holder').append('<iframe id="spot_frame" theme="light" view="coverart"src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:' + spottersArr.toString() + '" frameborder="0" allowtransparency="true" height="80" width="300"></iframe>')
					});
					
				
				$('.information').click(function()
					{
						
						id=$(this).attr('id');

						addInfo(id);
						
					});	
				
					}
				});				
		};



function addInfo(id)
{
	
	var id=cleanStr(id, 'infobox_');
	
	var idhtml = $('#'+id).parent().parent().html();
	var artist = idhtml.split('<br>by ')[1].split('</p>')[0];
	artist = artist.split(' featuring')[0];
	//artist = artist.split(' &amp')[0];
	artist = artist.split(' and')[0];
	artist =artist.slice(0, artist.length);
	$('#artist_holder').html('');
	
	var artists= new artistsList();
	var artist_for_url = runUrlEncoder(artist);
	console.log(artist_for_url);
	artists.url = 'http://developer.echonest.com/api/v4/artist/search?api_key=3KFREGLKBDFLWSIEC&format=json&name='+artist_for_url+'&results=1&bucket=songs&bucket=biographies&bucket=id:spotify-WW&limit=true&bucket=images&bucket=video&bucket=news&bucket=artist_location&rank_type=familiarity';
	artists.handleIt(artists.url);
	
	$('#info-area').slideDown();

}
			
