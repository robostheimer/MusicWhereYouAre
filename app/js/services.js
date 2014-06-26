'use strict';

/* Services */

//var app = angular.module('ofm.services', []);
MusicWhereYouAreApp.factory("getLocation", ['$q', '$http', '$sce', 'PlaylistCreate', 'HashCreate',
function($q, $http, $sce, PlaylistCreate, HashCreate) {
	var zoom = 11;
	var currentLat = 41.5;
	var currentLong = -91.6;
	var deferred = $q.defer();
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
			var lat_min = currentLat - .25;
			var lat_max = currentLat + .25;
			var long_min = currentLong - .25;
			var long_max = currentLong + .25;
			////Creates a promise that runs the Playlist creation Function and then the Map Create function.
			PlaylistCreate.runPlaylist(zoom, currentLat,currentLat,lat_min,lat_max,long_min, long_max );
			var deferred_loc = $q.defer();
			deferred_loc.promise.then(HashCreate.runHash());

			var url = 'http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&results=87&min_latitude=' + lat_min + '&max_latitude=' + lat_max + '&min_longitude=' + long_min + '&max_longitude=' + long_max + '&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance&bucket=song_currency';
			///////////TRY LOADING HTTP AND THEN RETURNING THE DATA TO THE PLAYLIST FUNCTION, THEN THE MAP////////////

		},

		handle_errors : function(error) {
			currentLat = 41.5;
			currentLong = 91.6
			lat_min = currentLat - .25;
			lat_max = currentLat + .25;
			long_min = currentLong - .25;
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

MusicWhereYouAreApp.factory('PlaylistCreate', ['$q', '$rootScope', '$http', '$sce', 'MapCreate', 'HashCreate',
function($q, $rootScope, $http, $sce, MapCreate, HashCreate) {

	/*var Playlist = {
		_runPlaylist : function() {
			alert('playlisting');
			var spot_arr = [];
			location_arr = [];
			spot_str = '';
			var url = 'http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&results=87&min_latitude=' + lat_min + '&max_latitude=' + lat_max + '&min_longitude=' + long_min + '&max_longitude=' + long_max + '&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance&bucket=song_currency';

			$http.get(url).success(function(data) {
				songs_non_dup = [];
				var songs = data.response.songs
				// response data;
				var song_str = '';
				var location_str = '';

				for (var x = 0; x < songs.length; x++) {
					if (!song_str.match(songs[x].title)) {
						songs_non_dup.push(songs[x])
						spot_arr.push(songs[x].tracks[0].foreign_id.split(':')[2]);
						if (!location_str.match(songs[x].artist_location.latitude + ',' + songs[x].artist_location.longitude)) {

							location_str += songs[x].artist_location.latitude + ',' + songs[x].artist_location.longitude + ':';
							location_arr.push('@@'+songs[x].artist_location.latitude + ':' + songs[x].artist_location.longitude+'&&' );
						}
						location_arr.push('<p class="info">'+songs[x].title+'<br/>'+songs[x].artist_name+'</p>');
						song_str += songs[x].title;
					}
					alert('test');
				}
				
				spot_str = 'https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:' + spot_arr.toString();
				spot_str = $sce.trustAsResourceUrl(spot_str);

				var deferred = $q.defer();
				deferred.promise.then(function() {

					MapCreate.runMap();
				});
				deferred.resolve();
			});
		}
	
	};*/
	
	return {
		 runPlaylist : function(zoom, lat, long,lat_min, lat_max, long_min, long_max){
		 	alert('pplaylisting2');
		 	var spot_arr = [];
			var location_arr = [];
			$rootScope.spot_str = '';
			var url = 'http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&results=87&min_latitude=' + lat_min + '&max_latitude=' + lat_max + '&min_longitude=' + long_min + '&max_longitude=' + long_max + '&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance&bucket=song_currency';

			$http.get(url).success(function(data) {
				$rootScope.songs_non_dup = [];
				var songs = data.response.songs;
				// response data;
				var song_str = '';
				var location_str = '';

				for (var x = 0; x < songs.length; x++) {
					if (!song_str.match(songs[x].title)) {
						$rootScope.songs_non_dup.push(songs[x]);
						spot_arr.push(songs[x].tracks[0].foreign_id.split(':')[2]);
						if (!location_str.match(songs[x].artist_location.latitude + ',' + songs[x].artist_location.longitude)) {

							location_str += songs[x].artist_location.latitude + ',' + songs[x].artist_location.longitude + ':';
							location_arr.push('@@'+songs[x].artist_location.latitude + ':' + songs[x].artist_location.longitude+'&&' );
						}
						location_arr.push('<p class="info">'+songs[x].title+'<br/>'+songs[x].artist_name+'</p>');
						song_str += songs[x].title;
					}
					
				}
				
				$rootScope.spot_str = 'https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:' + spot_arr.toString();
				$rootScope.spot_str = $sce.trustAsResourceUrl($rootScope.spot_str);

				var deferred = $q.defer();
				deferred.promise.then(function() {

					MapCreate.runMap(zoom, lat, long, location_arr, $rootScope.spot_str);
				});
				deferred.resolve();
			});
		 	}
	};
}]);

MusicWhereYouAreApp.factory('MapCreate', ['$q', '$http', '$sce',
function($q,  $http, $sce) {
	
	/*var Map = {
		_runMap : function() { map;
			console.log(location_arr);	
			var loc_arr=[];
			var loc_arr_string = location_arr.toString().replace(/<\/p>,/g, '');
			console.log(loc_arr_string)
			var loc_arr = loc_arr_string.split('&&');
			
;			var LatLng = new google.maps.LatLng(loc_arr[0].split('@@')[1].split(':')[0], loc_arr[0].split('@@')[1].split(':')[1].replace('&&',''));
			var infowindow_textArr =[];
			var mapOptions = {
				center : LatLng,
				zoom : zoom,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				draggable : true
			};
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			var marker_image = '/MusicWhereYouAre/genre_icons/marker_sm.png';
			for (var i = 0; i < loc_arr.length-1; i++) {
				var LatLng_marker = new google.maps.LatLng(loc_arr[i].split('@@')[1].split(':')[0], loc_arr[i].split('@@')[1].split(':')[1]);
				console.log(LatLng_marker);
				var geomarker = new google.maps.Marker({
					position : LatLng_marker,
					map : map,
					icon : marker_image
				});
				var infowindow = new google.maps.InfoWindow();

				var geomarker, i;
				infowindow_textArr.push(loc_arr[i].split('@@')[0].replace(',',''));
				
				

					google.maps.event.addListener(geomarker, 'click', (function(geomarker, i) {
						return function() {
							infowindow.setContent(infowindow_textArr[i]);
							infowindow.open(map, geomarker);
						};
					})(geomarker, i));
				
			}
		}
	};*/
	return {
		runMap :function(zoom,lat, long, arr, str){
		map;
			console.log(arr);	
			var loc_arr=[];
			var loc_arr_string = arr.toString().replace(/<\/p>,/g, '');
			console.log(loc_arr_string)
			var loc_arr = loc_arr_string.split('&&');
			
;			var LatLng = new google.maps.LatLng(loc_arr[0].split('@@')[1].split(':')[0], loc_arr[0].split('@@')[1].split(':')[1].replace('&&',''));
			var infowindow_textArr =[];
			var mapOptions = {
				center : LatLng,
				zoom : zoom,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				draggable : true
			};
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			var marker_image = '/MusicWhereYouAre/genre_icons/marker_sm.png';
			for (var i = 0; i < loc_arr.length-1; i++) {
				var LatLng_marker = new google.maps.LatLng(loc_arr[i].split('@@')[1].split(':')[0], loc_arr[i].split('@@')[1].split(':')[1]);
				console.log(LatLng_marker);
				var geomarker = new google.maps.Marker({
					position : LatLng_marker,
					map : map,
					icon : marker_image
				});
				var infowindow = new google.maps.InfoWindow();

				var geomarker, i;
				infowindow_textArr.push(loc_arr[i].split('@@')[0].replace(',',''));
				
				

					google.maps.event.addListener(geomarker, 'click', (function(geomarker, i) {
						return function() {
							infowindow.setContent(infowindow_textArr[i]);
							infowindow.open(map, geomarker);
						};
					})(geomarker, i));
				
			}	
		} 
	};
}]);

MusicWhereYouAreApp.factory("retrieveLocation", ['$q', '$rootScope', '$http', '$sce', '$window', 'PlaylistCreate', 'MapCreate', 'HashCreate',
function($q, $rootScope, $http, $sce, $window, PlaylistCreate, MapCreate, HashCreate) {
	//////////////////////MAKE WORK for LOWERCASE
	//////////////Manipulate strings so all items look like, 'Test, TS' to the program//////////////
	var location = {
		_runLocation : function(location) {
			var location = location;
			var lat_min;
			var long_min;
			var long_max;
			var lat_max;
			var currentLat;
			var currentLong;
			if (location.split(' ').length > 1 && location.match(',')) {
				var zoom = 11;
				///////city+full state//////
				if (location.split(',')[1].replace(' ', '').length > 2) {
					var locationSplit = location.split(',');
					var loc1 = toTitleCase(locationSplit[0]);
					var loc2 = toTitleCase(locationSplit[1].replace(' ', ''))

					var lat_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + loc2 + '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					var long_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + loc2 + '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';

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

									var hashy = window.location.hash.split('/')[1];
									window.location.href = '#/' + hashy + '/' + location;
									PlaylistCreate.runPlaylist(zoom, currentLat,currentLat,lat_min,lat_max,long_min, long_max );
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
					var locationSplit = location.split(',');
					var loc1 = toTitleCase(locationSplit[0]);
					var loc2 = locationSplit[1].replace(' ', '').toUpperCase();
					var lat_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + loc2 + '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					var long_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + loc2 + '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';

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

									var hashy = window.location.hash.split('/')[1];
									window.location.href = '#/' + hashy + '/' + location;
									PlaylistCreate.runPlaylist(zoom, currentLat,currentLat,lat_min,lat_max,long_min, long_max );
								}

							});

						} else {
							$('#geolocation_alert').show();
						}
					}).error(function(data, status, headers, config) {
						$('#geolocation_alert').show();
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
							lat_min = data.rows[0][0] - .25;
							lat_max = data.rows[(data.rows.length-1)][0] + .25;

							$http.get(long_url).success(function(data) {
								if (data.rows != null) {

									currentLong = data.rows[0][0]

									long_min = data.rows[0][0] - .25;
									long_max = data.rows[(data.rows.length-1)][0] + .25;

									location = locationReplace(location)

									var hashy = window.location.hash.split('/')[1];
									window.location.href = '#/' + hashy + '/' + location;
									PlaylistCreate.runPlaylist(zoom, currentLat,currentLat,lat_min,lat_max,long_min, long_max );
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
							lat_min = data.rows[0][0] - .25;
							lat_max = data.rows[(data.rows.length-1)][0] + .25;

							$http.get(long_url).success(function(data) {
								if (data.rows != null) {

									currentLong = data.rows[0][0]

									long_min = data.rows[0][0] - .25;
									long_max = data.rows[(data.rows.length-1)][0] + .25;

									location = locationReplace(location)

									var hashy = window.location.hash.split('/')[1];
									window.location.href = '#/' + hashy + '/' + location;
									PlaylistCreate.runPlaylist(zoom, currentLat,currentLat,lat_min,lat_max,long_min, long_max );
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
	return {
		runLocation : location._runLocation
	};
}]);

MusicWhereYouAreApp.factory("HashCreate", ['$q', '$rootScope', '$http', '$sce',
function($q, $rootScope, $http, $sce) {
	var Hashy = {
		_runHash : function() {
			var url = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+CityName%2C+StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+Lat+<=+" + currentLat + "+AND+Lat>=" + (currentLat - .05) + "+AND+Long<=" + currentLong + "+AND+Long>=" + (currentLong - .05) + "&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
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
					var location = city + '*' +state;

				} else {
					var location = "";
				}

				var hashy = '#/' + window.location.hash.split('/')[1].split('/')[0];

				window.location.href = hashy + '/' + location;
			});
		}
	};
	return {
		runHash : Hashy._runHash
	};

}]);

MusicWhereYouAreApp.factory("changeGenre", ['$q', '$rootScope', '$http', '$sce',
function($q, $rootScope, $http, $sce) {

}]);

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
