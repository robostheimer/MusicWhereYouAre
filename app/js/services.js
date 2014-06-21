'use strict';

/* Services */

//var app = angular.module('ofm.services', []);
MusicWhereYouAreApp.factory("getLocation", ['$q', '$rootScope', '$http', '$sce', 'PlaylistCreate', 'MapCreate', 'HashCreate',
function($q, $rootScope, $http, $sce, PlaylistCreate, MapCreate, HashCreate) {
	
	$rootScope.currentLat = 41.5
	$rootScope.currentLong = -91.6
	var deferred = $q.defer();
	var Geolocation = {
		_checkGeoLocation : function() {
			
			////////Checks if Geolocation is available;
			if (navigator.geolocation) {
				
				/////If it is is runs the handle_geolocation_query or the handle Gelocation.handle)errors function if access to the Geolocation API is denied by the user
				navigator.geolocation.getCurrentPosition(Geolocation.handle_geolocation_query, Geolocation.handle_errors);

			} else {

				var error = 'Your browser does not support geolocation.  Please type a city and sate into the form field. ';
				alert(error)

			}
		},

		handle_geolocation_query : function(position) {
			$('#map-canvas').show();
			$('#geolocation_alert').hide();
			$rootScope.currentLat = (position.coords.latitude);
			$rootScope.currentLong = (position.coords.longitude);
			$rootScope.lat_min = $rootScope.currentLat - .25;
			$rootScope.lat_max = $rootScope.currentLat + .25;
			$rootScope.long_min = $rootScope.currentLong - .25;
			$rootScope.long_max = $rootScope.currentLong + .25
			////Creates a promise that runs the Playlist creation Function and then the Map Create function.
			var deferred = $q.defer();
			
			deferred.promise.then(PlaylistCreate.runPlaylist()).then(MapCreate.runMap()).then(HashCreate.runHash());
			deferred.resolve();

		},

		handle_errors : function(error) {
			$rootScope.currentLat = 41.5;
			$rootScope.currentLong = 91.6
			$rootScope.lat_min = $rootScope.currentLat - .25;
			$rootScope.lat_max = $rootScope.currentLat + .25;
			$rootScope.long_min = $rootScope.currentLong - .25;
			$rootScope.long_max = $rootScope.currentLong + .25

			switch(error.code) {
				case error.PERMISSION_DENIED:

					$rootScope.error = 'Choose a City and State from the form below or enable geolocation on your device.'
					break;

				case error.POSITION_UNAVAILABLE:
					$rootScope.error = 'We could not detect current position';
					break;

				case error.TIMEOUT:
					$rootScope.error = 'There was a server timeout.'
					break;

				default:
					$rootScope.error = 'There was an unknown error.';
					break;
			}
			$('#geolocation_alert').show();
			

		},
	};
	return {
		checkGeoLocation : Geolocation._checkGeoLocation
	};
}])
.directive('mwyaMap', function(getLocation, retrieveLocation, $q) {
	return function($rootScope, elem)
	{	
		if(window.location.hash.split('/').length<=2)
		{
			
		if (navigator.geolocation) {
				/////If it is is runs the handle_geolocation_query or the handle Gelocation.handle)errors function if access to the Geolocation API is denied by the user
  			var deferred_geo = $q.defer();
			deferred_geo.promise.then().then(getLocation.checkGeoLocation());
			deferred_geo.resolve();

			} else {

				$('#geolocation_alert').show();

			}
		}	

};
});

MusicWhereYouAreApp.factory('PlaylistCreate', ['$q', '$rootScope', '$http', '$sce',
function($q, $rootScope, $http, $sce) {

	var Playlist = {
		_runPlaylist : function() {
			var spot_arr = [];
			$rootScope.location_arr = [];
			$rootScope.spot_str = '';
			var url = 'http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&results=87&min_latitude=' + $rootScope.lat_min + '&max_latitude=' + $rootScope.lat_max + '&min_longitude=' + $rootScope.long_min + '&max_longitude=' + $rootScope.long_max + '&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance&bucket=song_currency';

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
						$rootScope.location_arr.push(songs[x].artist_location.latitude, songs[x].artist_location.longitude);
						song_str += songs[x].title;
					}

				}

				//console.log($rootScope.songs_non_dup);
				$rootScope.spot_str = 'https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:' + spot_arr.toString();

				$rootScope.spot_str = $sce.trustAsResourceUrl($rootScope.spot_str);
			});
		}
	};
	return {
		runPlaylist : Playlist._runPlaylist
	};
}]);

MusicWhereYouAreApp.factory('MapCreate', ['$q', '$rootScope', '$http', '$sce',
function($q, $rootScope, $http, $sce) {

	var Map = {
		_runMap : function() { map;
			var LatLng = new google.maps.LatLng($rootScope.currentLat, $rootScope.currentLong)
			var mapOptions = {
				center : LatLng,
				zoom : 12,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				draggable : true
			};
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			var marker_image = '/MusicWhereYouAre/genre_icons/marker_sm.png';
			var geomarker = new google.maps.Marker({
				position : LatLng,
				map : map,
				icon : marker_image
			});

		}
	};
	return {
		runMap : Map._runMap
	};
}]);

MusicWhereYouAreApp.factory("retrieveLocation", ['$q', '$rootScope', '$http', '$sce', '$window', 'PlaylistCreate', 'MapCreate',
function($q, $rootScope, $http, $sce, $window, PlaylistCreate, MapCreate) {
//////////////////////MAKE WORK for LOWERCASE
//////////////Manipulate strings so all items look like, 'Test, TS' to the program//////////////
	var location = {
		_runLocation : function(location) {
			var location = location;
			
			if (location.split(' ').length > 1 && location.match(',')) {

				///////city+full state//////
				if (location.split(',')[1].replace(' ', '').length > 2) {
					var locationSplit = location.split(',');
					var loc1 = toTitleCase(locationSplit[0]);
					var loc2 = toTitleCase(locationSplit[1].replace(' ', ''))
					
					var lat_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + loc2 +  '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					var long_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + loc2 +  '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					
					
					$http.get(lat_url).success(function(data) {
						if (data.rows != null) {
							$('#map-canvas').show();
							$('#geolocation_alert').hide();
							$rootScope.currentLat = data.rows[0][0];
							$rootScope.lat_min = data.rows[0][0] - .25;
							$rootScope.lat_max = data.rows[(data.rows.length-1)][0] + .25;
								
								$http.get(long_url).success(function(data) {
									if (data.rows != null) {
									
									$rootScope.currentLong = data.rows[0][0]
									
									$rootScope.long_min = data.rows[0][0] - .25;
									$rootScope.long_max = data.rows[(data.rows.length-1)][0] + .25;
									location = location.replace(', ', '*');
								location = location.replace(',', '*');
								location = location.replace(/ /g, '_');
							
							var hashy = window.location.hash.split('/')[1];
							window.location.href = '#/' + hashy + '/' + location;
							var deferred = $q.defer();
							deferred.promise.then(PlaylistCreate.runPlaylist()).then(MapCreate.runMap());
							deferred.resolve();
									}
							
								});
							
								
							}
							else {
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
					var lat_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + loc2 +  '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					var long_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + loc2 +  '%27+AND+CityName%3D%27' + loc1 + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					
					
					$http.get(lat_url).success(function(data) {
						if (data.rows != null) {
							$('#map-canvas').show();
							$('#geolocation_alert').hide();
							$rootScope.currentLat = data.rows[0][0];
							$rootScope.lat_min = data.rows[0][0] - .25;
							$rootScope.lat_max = data.rows[(data.rows.length-1)][0] + .25;
								
								$http.get(long_url).success(function(data) {
									if (data.rows != null) {
									
									$rootScope.currentLong = data.rows[0][0]
									
									$rootScope.long_min = data.rows[0][0] - .25;
									$rootScope.long_max = data.rows[(data.rows.length-1)][0] + .25;
									location = location.replace(', ', '*');
								location = location.replace(',', '*');
								location = location.replace(/ /g, '_');
							
							var hashy = window.location.hash.split('/')[1];
							window.location.href = '#/' + hashy + '/' + location;
							var deferred = $q.defer();
							deferred.promise.then(PlaylistCreate.runPlaylist()).then(MapCreate.runMap());
							deferred.resolve();
									}
							
								});
							
								
							}
							else {
							$('#geolocation_alert').show();
						}
						}).error(function(data, status, headers, config) {
						$('#geolocation_alert').show();
					});
				}

			} else {
				///Full State
				if (location.length > 2) {

					
					var lat_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + location + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					var long_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+State+%3D+%27' + location + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					
					location =toTitleCase(location);
					$http.get(lat_url).success(function(data) {
						if (data.rows != null) {
							$('#map-canvas').show();
							$('#geolocation_alert').hide();
							$rootScope.currentLat = data.rows[0][0];
							$rootScope.lat_min = data.rows[0][0] - .25;
							$rootScope.lat_max = data.rows[(data.rows.length-1)][0] + .25;
								
								$http.get(long_url).success(function(data) {
									if (data.rows != null) {
									
									$rootScope.currentLong = data.rows[0][0]
									
									$rootScope.long_min = data.rows[0][0] - .25;
									$rootScope.long_max = data.rows[(data.rows.length-1)][0] + .25;
									
									location = location.replace(', ', '*');
								location = location.replace(',', '*');
								location = location.replace(/ /g, '_');
							
							var hashy = window.location.hash.split('/')[1];
							window.location.href = '#/' + hashy + '/' + location;
							var deferred = $q.defer();
							deferred.promise.then(PlaylistCreate.runPlaylist()).then(MapCreate.runMap());
							deferred.resolve();
									}
							
								});
							
								
							}
							else {
							$('#geolocation_alert').show()
						}
						}).error(function(data, status, headers, config) {
						$('#geolocation_alert').show()

					});
							
							//console.log($rootScope.lat_min+':'+$rootScope.lat_max);
							
							
					
					

				} else {
					location = location.toUpperCase();
					///State Abbreviation
					var lat_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Lat,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + location + '%27+ORDER%20BY+Lat&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					var long_url = 'https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Long,StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+StateAB+%3D+%27' + location + '%27+ORDER%20BY+Long&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0';
					
					
					$http.get(lat_url).success(function(data) {
						if (data.rows != null) {
							$('#map-canvas').show();
							$('#geolocation_alert').hide();							
							$rootScope.currentLat = data.rows[0][0];
							$rootScope.lat_min = data.rows[0][0] - .25;
							$rootScope.lat_max = data.rows[(data.rows.length-1)][0] + .25;
								
								$http.get(long_url).success(function(data) {
									if (data.rows != null) {
									
									$rootScope.currentLong = data.rows[0][0]
									
									$rootScope.long_min = data.rows[0][0] - .25;
									$rootScope.long_max = data.rows[(data.rows.length-1)][0] + .25;
									location = location.replace(', ', '*');
								location = location.replace(',', '*');
								location = location.replace(/ /g, '_');
							
							var hashy = window.location.hash.split('/')[1];
							window.location.href = '#/' + hashy + '/' + location;
							var deferred = $q.defer();
							deferred.promise.then(PlaylistCreate.runPlaylist()).then(MapCreate.runMap());
							deferred.resolve();
									}
							
								});
							
								
							}
							else {
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
			var url = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+CityName%2C+StateAB+FROM+1pEQI6OP8JTmqtmTZSC60jjP68joczfqrjVKLvNQ+WHERE+Lat+<=+" + $rootScope.currentLat + "+AND+Lat>=" + ($rootScope.currentLat - .05) + "+AND+Long<=" + $rootScope.currentLong + "+AND+Long>=" + ($rootScope.currentLong - .05) + "&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0";
			$http.get(url).success(function(data) {
				if (data.rows != null) {
					$rootScope.city = data.rows[0][0];
					$rootScope.state = data.rows[0][1];
					if ($rootScope.city.split(' ') > 1) {
						$rootScope.city = $rootScope.city.replace(/ /g, '_');
					}
					if ($rootScope.state.split(' ') > 1) {
						$rootScope.state = $rootScope.state.replace(/ /g, '_');
					}
					var location = $rootScope.city + '*' + $rootScope.state;
					
				} else {
					var location = "";
				}
				var hashy='#/'+window.location.hash.split('/')[1].split('/')[0];
				
				window.location.href=hashy+'/'+location;
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

