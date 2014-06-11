'use strict';

/* Services */

//var app = angular.module('ofm.services', []);
MusicWhereYouAreApp.factory("getLocation",['$q', '$rootScope', '$http', '$sce','PlaylistCreate', 'MapCreate', function($q, $rootScope, $http, $sce, PlaylistCreate, MapCreate) {
	$rootScope.currentLat = 39.5;
	$rootScope.currentLong = -98.35
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
		
			$rootScope.currentLat = (position.coords.latitude);
			$rootScope.currentLong = (position.coords.longitude);
			$rootScope.lat = $rootScope.currentLat;
			$rootScope.lng = $rootScope.currentLong;
			////Creates a promise that runs the Playlist creation Function and then the Map Create function.
			var deferred = $q.defer();	
			
			deferred.promise.then(PlaylistCreate.runPlaylist()).then(MapCreate.runMap());
			deferred.resolve();
			
		},

		handle_errors : function(error) {
			$rootScope.currentLat = 39.5;
			$rootScope.currentLong = -98.35;
			$rootScope.lat = $rootScope.currentLat;
			$rootScope.lng = $rootScope.currentLong;
			
			
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
			var deferred = $q.defer();	
			
			deferred.promise.then(PlaylistCreate.runPlaylist()).then(MapCreate.runMap());
			deferred.resolve();
			
		},

		/*runPlaylist : function(lat, long) {

			var lat_min = currentLat - .25;
			var lat_max = currentLat + .25;
			var long_min = currentLong - .25;
			var long_max = currentLong + .25
			var spot_arr = [];
			$rootScope.location_arr = [];
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
						$rootScope.location_arr.push(songs[x].artist_location.latitude, songs[x].artist_location.longitude);
						song_str += songs[x].title;
					}

				}

				console.log($rootScope.songs_non_dup);
				$rootScope.spot_str = 'https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:' + spot_arr.toString();

				$rootScope.spot_str = $sce.trustAsResourceUrl($rootScope.spot_str);
			});
		},
		runMap : function(lat, long, arr) {
			
			var LatLng = new google.maps.LatLng(lat, long)
			var mapOptions = {
				center : LatLng,
				zoom : 15,
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

		}*/
	};
	return {
		checkGeoLocation : Geolocation._checkGeoLocation
	};
}]).directive('mwyaMap', function() {
	return {
		restrict : 'E',
		transclude : true,
		templateUrl : 'partials/map.html'
	};
});


MusicWhereYouAreApp.factory('PlaylistCreate', ['$q','$rootScope', '$http', '$sce', function($q, $rootScope, $http, $sce) {
		
	var Playlist = {
		_runPlaylist : function() {
			
			var lat_min = $rootScope.currentLat - .25;
			var lat_max =  $rootScope.currentLat + .25;
			var long_min =  $rootScope.currentLong - .25;
			var long_max = $rootScope.currentLong + .25
			var spot_arr = [];
			$rootScope.location_arr = [];
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
						$rootScope.location_arr.push(songs[x].artist_location.latitude, songs[x].artist_location.longitude);
						song_str += songs[x].title;
					}

				}

				console.log($rootScope.songs_non_dup);
				$rootScope.spot_str = 'https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:' + spot_arr.toString();

				$rootScope.spot_str = $sce.trustAsResourceUrl($rootScope.spot_str);
			});
		}
	};
	return {
		runPlaylist : Playlist._runPlaylist
	};
}]);


MusicWhereYouAreApp.factory('MapCreate', ['$q','$rootScope', '$http', '$sce', function($q, $rootScope, $http, $sce) {

var Map = {
		_runMap : function() {
			
			map;
			var LatLng = new google.maps.LatLng($rootScope.currentLat, $rootScope.currentLong)
			var mapOptions = {
				center : LatLng,
				zoom : 15,
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
}])
.directive('mwyaMap', function() {
	return {
		restrict : 'E',
		transclude : true,
		templateUrl : 'partials/map.html'
	};
});

;




MusicWhereYouAreApp.factory("changeGenre",['$q', '$rootScope', '$http', '$sce', function($q, $rootScope, $http, $sce) {
	
	
}]);
	

MusicWhereYouAreApp.factory("retrieveInfo",['$q', '$rootScope', '$http', '$sce', function($q, $rootScope, $http, $sce) {
	
	
}]);


MusicWhereYouAreApp.factory("addToFavorites",['$q', '$rootScope', '$http', '$sce', function($q, $rootScope, $http, $sce) {
	
	
}]);









