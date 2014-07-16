'use strict';

/* Services */

//var app = angular.module('ofm.services', []);
MusicWhereYouAreApp.factory("getLocation", ['$q', '$http', '$sce', 'PlaylistCreate', 'HashCreate','$rootScope',
function($q, $http, $sce, PlaylistCreate, HashCreate, $rootScope) {
	
	
	var zoom = 11;
	var currentLat = 41.5;
	var currentLong = -91.6;
	var deferred = $q.defer();
	$rootScope.genres='';
	var Geolocation = {
		_checkGeoLocation : function() {
			////////Checks if Geolocation is available;

			/////If it is is runs the handle_geolocation_query or the handle Gelocation.handle)errors function if access to the Geolocation API is denied by the user
			navigator.geolocation.getCurrentPosition(Geolocation.handle_geolocation_query, Geolocation.handle_errors);
		},

		handle_geolocation_query : function(position) {

			$('#map-canvas').show();
			$('#geolocation_alert').hide();
			currentLat = (position.coords.latitude);
			currentLong = (position.coords.longitude);
			var lat_min = currentLat - .18;
			var lat_max = currentLat + .18;
			var long_min = currentLong - .18;
			var long_max = currentLong + .18;
			////Creates a promise that runs the Playlist creation Function and then the Map Create function.
			HashCreate.runHash(currentLat, currentLong)
			
			
			//var deferred_loc = $q.defer();
			//deferred_loc.promise.then(PlaylistCreate.runPlaylist(zoom, currentLat,currentLat,lat_min,lat_max,long_min, long_max ));

			var url = 'http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&results=87&min_latitude=' + lat_min + '&max_latitude=' + lat_max + '&min_longitude=' + long_min + '&max_longitude=' + long_max + '&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance&bucket=song_currency';
			///////////TRY LOADING HTTP AND THEN RETURNING THE DATA TO THE PLAYLIST FUNCTION, THEN THE MAP////////////

		},

		handle_errors : function(error) {
			currentLat = 41.5;
			currentLong = 91.6
			lat_min = currentLat - .18;
			lat_max = currentLat + .18;
			long_min = currentLong - .18;
			long_max = currentLong + .25

			switch(error.code) {
				case error.PERMISSION_DENIED:

					error = 'Choose a City and State from the form below or enable geolocation on your device.'
					break;

				case error.POSITION_UNAVAILABLE:
					error = 'We could not detect current position';
					break;

				case error.TIMEOUT:
					error = 'There was a server timeout.'
					break;

				default:
					error = 'There was an unknown error.';
					break;
			}
			$('#geolocation_alert').show();

		},
	};
	return {
		checkGeoLocation : Geolocation._checkGeoLocation
	};
}]);



MusicWhereYouAreApp.factory('PlaylistCreate', ['$q', '$rootScope', '$http', '$sce', 'MapCreate', 'HashCreate','$location',
function($q, $rootScope, $http, $sce, MapCreate, HashCreate, $location) {
	

	return {
		 runPlaylist : function(zoom, lat, long,lat_min, lat_max, long_min, long_max){
		 
		 	var genresSplit = $rootScope.genres.split('**');
		 	var finalgenres = '';
		 	for (var i=0; i<genresSplit.length; i++)
		 	{
		 		
		 		if(genresSplit.length>0&& genresSplit[i]!="")
		 		{
		 		finalgenres +='&style='+genresSplit[i];
		 		}
		 		
		 	}
		 	var spot_arr = [];
			var location_arr = [];
			var final_loc_arr=[];
			$rootScope.lat_min = lat_min;
			$rootScope.long_min = long_min;
			$rootScope.spot_str = '';
			var url = 'http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&results=87&min_latitude=' + lat_min + '&max_latitude=' + lat_max + '&min_longitude=' + long_min + '&max_longitude=' + long_max + '&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance&bucket=song_currency'+finalgenres;

			$http.get(url).success(function(data) {
				$rootScope.songs_non_dup = [];
				var songs = data.response.songs;
				var song_str = '';
				var location_str = '';

				for (var x = 0; x < songs.length; x++) {
					if (!song_str.replace(/\W/g,'').match(songs[x].title.replace(/\W/g,''))) {
						$rootScope.songs_non_dup.push(songs[x]);
						spot_arr.push(songs[x].tracks[0].foreign_id.split(':')[2]);
						song_str += songs[x].title;
							location_arr.push(songs[x].artist_location.location +'@@'+songs[x].artist_location.latitude + ':' + songs[x].artist_location.longitude+'&&<h5>'+songs[x].title+'</h5>'+songs[x].artist_name);
						
						
						
					}
					
				}
				location_arr.sort();
				for (var r=0; r<location_arr.length; r++)
				{
					if(!location_str.match(location_arr[r].split('@@')[0]))
					{
					final_loc_arr.push('%%'+location_arr[r]);
					location_str += location_arr[r].split('@@')[0];
					}
					else
					{
						final_loc_arr.push(location_arr[r].split('@@')[1].split('&&')[1]);
						
					}
				}	
				
				$rootScope.spot_str = 'https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:' + spot_arr.toString();
				$rootScope.spot_str = $sce.trustAsResourceUrl($rootScope.spot_str);

				var deferred = $q.defer();
				deferred.promise.then(function() {
				
					MapCreate.runMap(zoom, lat, long, final_loc_arr, $rootScope.spot_str);
				});
				deferred.resolve();
			});
		 	}
	};
}]);

MusicWhereYouAreApp.factory('MapCreate', ['$q', '$http', '$sce',
function($q,  $http, $sce) {
	
	return {
		runMap :function(zoom,lat, long, arr, str){
		map;
			
			var loc_arr=[];
			var loc_arr_string = arr.toString().replace(/<\/p>,/g, '');
			loc_arr_string = loc_arr_string.replace(/,%%/g, '%%');
			var loc_arr = loc_arr_string.split('%%');
			var LatLng = new google.maps.LatLng(loc_arr[1].split('@@')[1].split(':')[0], loc_arr[1].split('@@')[1].split(':')[1].split('&&')[0]);
			var infowindow_textArr =[];
			var mapOptions = {
				center : LatLng,
				zoom : zoom,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				draggable : true
			};
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			var marker_image = '/MusicWhereYouAre/genre_icons/marker_sm.png';
			for (var i = 1; i < loc_arr.length; i++) {
				var LatLng_marker = new google.maps.LatLng(loc_arr[i].split('@@')[1].split(':')[0], loc_arr[i].split('@@')[1].split(':')[1].split('&&')[0]);
				var geomarker = new google.maps.Marker({
					position : LatLng_marker,
					map : map,
					icon : marker_image
				});
				var infowindow = new google.maps.InfoWindow();
				var geomarker, i;
				//infowindow_textArr.push('<b>'+loc_arr[(i-1)].split('@@')[0].replace(/, US/g,'')+'</b><br><br/>'+loc_arr[(i-1)].split('&&')[1]);
				
				

					google.maps.event.addListener(geomarker, 'click', (function(geomarker, i) {
						return function() {
							
							infowindow.setContent('<b>'+loc_arr[(i)].split('@@')[0].replace(/, US/g,'')+'</b><br/>'+loc_arr[(i)].split('&&')[1].replace(/,\<h5\>/g, '<h5>')+'<br/>');
							infowindow.open(map, geomarker);
						};
					})(geomarker, i));
				
			}	
		} 
	};
}]);

MusicWhereYouAreApp.factory("retrieveLocation", ['$q', '$rootScope', '$http', '$sce', '$window', 'PlaylistCreate', 'MapCreate', 'HashCreate','$location',
function($q, $rootScope, $http, $sce, $window, PlaylistCreate, MapCreate, HashCreate,$location) {
	//////////////////////MAKE WORK for LOWERCASE
	//////////////Manipulate strings so all items look like, 'Test, TS' to the program//////////////
	return {
		runLocation : function(location) {
			var location = location;
			var lat_min;
			var long_min;
			var long_max;
			var lat_max;
			var currentLat;
			var currentLong;
			
			//console.log($rootScope.genres);
			
			if (location.split(' ').length > 1 && location.match(',')) {
				var zoom = 11;
				///////city+full state//////
				if (location.split(',')[1].replace(' ', '').length > 2) {
					var locationSplit = location.split(',');
					var loc1 = toTitleCase(locationSplit[0]);
					var loc2 = toTitleCase(locationSplit[1].replace(' ', ''))

					var lat_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + loc2 + '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					var long_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + loc2 + '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';

					$http.get(lat_url).success(function(data) {
						if (data.rows != null) {
							$('#map-canvas').show();
							$('#geolocation_alert').hide();
							currentLat = data.rows[0][0];
							lat_min = data.rows[0][0] - .10;
							lat_max = data.rows[(data.rows.length-1)][0] + .10;

							$http.get(long_url).success(function(data) {
								if (data.rows != null) {

									currentLong = data.rows[0][0]

									long_min = data.rows[0][0] - .10;
									long_max = data.rows[(data.rows.length-1)][0] + .10;
									location = locationReplace(location);

									var hashy = $location.path().split('/')[1];
									
									$rootScope.location_link = location
									if(($rootScope.long_min!=long_min && $rootScope.lat_min!=lat_min) || $rootScope.genres!="")
									{
									$location.path( hashy + '/'+location);		
									PlaylistCreate.runPlaylist(zoom, currentLat,currentLat,lat_min,lat_max,long_min, long_max);
									}
								}

							});

						} else {
							$('#geolocation_alert').show()
						}
					}).error(function(data, status, headers, config) {
						$('#geolocation_alert').show()

					});

				} else {

					////city + state Abreviation
					location = location.replace('_', ' ')
					var locationSplit = location.split(',');
					var loc1 = toTitleCase(locationSplit[0]);
					var loc2 = locationSplit[1].replace(' ', '').toUpperCase();
					var lat_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + loc2 + '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					var long_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + loc2 + '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					
					$http.get(lat_url).success(function(data) {
						if (data.rows != null) {
							$('#map-canvas').show();
							$('#geolocation_alert').hide();
							currentLat = data.rows[0][0];
							lat_min = data.rows[0][0] - .10;
							lat_max = data.rows[(data.rows.length-1)][0] + .10;

							$http.get(long_url).success(function(data) {
								if (data.rows != null) {

									currentLong = data.rows[0][0]

									long_min = data.rows[0][0] - .10;
									long_max = data.rows[(data.rows.length-1)][0] + .10;
									location = locationReplace(location);

									var hashy = $location.path().split('/')[1];
									
									$rootScope.location_link = location
									if(($rootScope.long_min!=long_min && $rootScope.lat_min!=lat_min) || $rootScope.genres!="")
									{
									$location.path( hashy + '/'+location);		
									PlaylistCreate.runPlaylist(zoom, currentLat,currentLat,lat_min,lat_max,long_min, long_max);
									}
									
								}

							});

						} else {
							$('#geolocation_alert').show();
						}
					}).error(function(data, status, headers, config) {
						$('#geolocation_alert').show();
					//console.log('error')
					});
				}

			} else {
				var zoom = 6;
				///Full State
				if (location.length > 2) {

					var lat_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + location + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					var long_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + location + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';

					location = toTitleCase(location);
					$http.get(lat_url).success(function(data) {
						if (data.rows != null) {
							$('#map-canvas').show();
							$('#geolocation_alert').hide();
							currentLat = data.rows[0][0];
							lat_min = data.rows[0][0] - .18;
							lat_max = data.rows[(data.rows.length-1)][0] + .18;

							$http.get(long_url).success(function(data) {
								if (data.rows != null) {

									currentLong = data.rows[0][0]

									long_min = data.rows[0][0] - .18;
									long_max = data.rows[(data.rows.length-1)][0] + .18;

									location = locationReplace(location)

									var hashy = $location.path().split('/')[1];
									$rootScope.location_link = location
									//$location.path( hashy + '/' + location);
									$rootScope.location_link = location
									if(($rootScope.long_min!=long_min && $rootScope.lat_min!=lat_min) || $rootScope.genres!="")
									{
									$location.path( hashy + '/'+location);		
									PlaylistCreate.runPlaylist(zoom, currentLat,currentLat,lat_min,lat_max,long_min, long_max);
									}
								}

							});

						} else {
							$('#geolocation_alert').show()
						}
					}).error(function(data, status, headers, config) {
						$('#geolocation_alert').show()

					});

					//console.log(lat_min+':'+lat_max);

				} else {
					location = location.toUpperCase();
					///State Abbreviation
					var lat_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + location + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					var long_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + location + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';

					$http.get(lat_url).success(function(data) {
						if (data.rows != null) {
							$('#map-canvas').show();
							$('#geolocation_alert').hide();
							currentLat = data.rows[0][0];
							lat_min = data.rows[0][0] - .18;
							lat_max = data.rows[(data.rows.length-1)][0] + .18;

							$http.get(long_url).success(function(data) {
								if (data.rows != null) {

									currentLong = data.rows[0][0]

									long_min = data.rows[0][0] - .18;
									long_max = data.rows[(data.rows.length-1)][0] + .18;

									location = locationReplace(location)

									var hashy = $location.path().split('/')[1];
									//$location.path( hashy + '/' + location);
									$rootScope.location_link = location
									if(($rootScope.long_min!=long_min && $rootScope.lat_min!=lat_min) || $rootScope.genres!="")
									{
									$location.path( hashy + '/'+location);		
									PlaylistCreate.runPlaylist(zoom, currentLat,currentLat,lat_min,lat_max,long_min, long_max);
									}
								}

							});

						} else {
							$('#geolocation_alert').show()
						}
					}).error(function(data, status, headers, config) {
						$('#geolocation_alert').show()

					});
				}
			}
		}
	};
	
}]);

MusicWhereYouAreApp.factory("HashCreate", ['$q', '$rootScope', '$http', '$sce','$location',
function($q, $rootScope, $http, $sce, $location) {
	return{
			runHash : function(lat, lng) {
			var url = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+CityName%2C+StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+Lat+<=+" + lat + "+AND+Lat>=" + (lat - .05) + "+AND+Long<=" + lng + "+AND+Long>=" + (lng - .05) + "&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
			$http.get(url).success(function(data) {
				if (data.rows != null) {
					var city = data.rows[0][0];
					var state = data.rows[0][1];
					if (city.split(' ') > 1) {
						city = city.replace(/ /g, '_');
					}
					if (state.split(' ') > 1) {
						state = state.replace(/ /g, '_');
					}
					var location = city + '*' +state+'/';
					;
				} else {
					var location = "";
				}

				var hashy = $location.path().split('/')[1].split('/')[0];

				//window.location.href = hashy + '/' + location;
				$location.path(hashy+'/'+location);
			});
		}
	};	
}]);

MusicWhereYouAreApp.factory("loadGenreCheckData", 
function(){
	return {
			  getGenre: function() {
		
			var Genre=[{genre: {checked : false,isSelected : false, state: 'off',  genre: 'avant garde', similarGenres: 'avant garde**avant garde jazz**avant garde metal'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre: 'blues', similarGenres: 'blues**blues guitar**blues revival**blues rock**blues-rock**british blues**chicago blues**classic blues**contemporary blues**country blues**delta blues**electric blues**juke joint blues louisiana blues**memphis blues**modern blues**modern electric blues**new orleans blues**slide guitar blues**soul blues**texas blues'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre: 'classic rock', similarGenres: 'classic rock' }}, {genre : {checked : false, isSelected : false, state: 'off',  genre: 'classical', similarGenres: 'classical**classical pop**contemporary classical music**crossover classical**modern classical'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre: 'comedy', similarGenres:'comedy**comedy rock'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre: 'country', similarGenres: 'country rock**alternative country**country**honky tonk**cowboy punk**classic country**modern country**hillbilly**rockabilly**bluegrass**country pop**outlaw country**pop country**progressive country**texas country'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre: 'drama', similarGenres: 'drama'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre:'electronic', similarGenres: 'electronic**electro**electro hip hop**electro house**electro rock**electro-funk**electro-industrial**electro jazz**experimental electronic**indie electronic'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre:'folk', similarGenres: 'folk**acid folk**alternative folk**contemporary folk**country folk**electric folk**folk pop**folk revival**folk rock**folk pop**indie folk**neo folk**pop folk**psychedelic folk**stomp and holler**traditional folk**urban folk'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre: 'hip hop', similarGenres:'hip hop**classic hip hop**rap**west coast hip hop**alternative hip hop**east coast hip hop**electro hip hop**experimental hip hop**independent hip hop**indie hip hop**jazz hip hop**old school hip hop**southern hip hop'}}, {genre : {checked : false,isSelected : false, state: 'off',   genre: 'holiday', similarGenres: 'holiday'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre: 'indie', similarGenres: 'indie rock**geek rock**lo fi**math rock**indie folk**indie hip hop**indie**indy'}}, {genre : {checked : false, isSelected : false, state: 'off',  genre : 'jazz', similarGenres: 'jazz**jazz blues**jazz funk**jazz fusion**jazz hip hop**jazz rock**jazz vocal**latin jazz**modern jazz**new orleans jazz**soul jazz**traditional jazz' }}, {genre : {checked : false,isSelected : false, state: 'off',  genre: "kid music", similarGenres:'children\'s music'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre : 'latin', similarGenres: 'latin**latin jazz**jazz latino**latin alternative**latin folk**latin hip hop**latin pop**latin music**latin rap**latin rock**latin ska'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre : 'new age', similarGenres:'new age**new age music'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre: 'motown', similarGenres: 'motown**classic motown**soul**memphis soul**old school soul**soul music**soul'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre: 'pop', similarGenres:'pop 60s pop**80s pop**acoustic pop**alternative pop**pop rock**dance pop**folk pop**jangle pop**pop country**pop punk**pop rap**pop folk**psychedelic pop'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre: 'rock', similarGenres: 'rock**punk rock**classic rock**college rock**dance rock**electro rock**folk rock**garage rock**jam band**hard rock**modern rock**psychedelic stoner rock**punk**southern rock**80s rock**90s rock**70s rock**60s rock**alternative rock**acoustic rock**acid rock'}}, {genre : {checked : false,isSelected : false, state: 'off',  genre: 'soft rock', similarGenres: 'soft rock**easy listening'}}, {genre: {checked : false,isSelected : false, state: 'off',  genre: 'world', similarGenres: 'world world music**world beat**world fusion'}}];	
	
	return Genre;
	}
};	
});

MusicWhereYouAreApp.factory("retrieveInfo", ['$q', '$rootScope', '$http', '$sce',
function($q, $rootScope, $http, $sce) {


}]);

MusicWhereYouAreApp.factory("addToFavorites", ['$q', '$rootScope', '$http', '$sce',
function($q, $rootScope, $http, $sce) {

}]);

function runPlaylist(songs) {
	var arr = songs
	for (var i = 0; i < arr.length; i++) {

	}
}
