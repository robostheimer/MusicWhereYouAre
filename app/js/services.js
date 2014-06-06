'use strict';

/* Services */

//var app = angular.module('ofm.services', []);

MusicWhereYouAreApp.factory('GetLocation', ['$window',
function() {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_errors);
	} else {
		var error = "Geolocation is not supported by this browser.";
	}

	function handle_geolocation_query(position) {

		var currentLat = (position.coords.latitude);
		var currentLong = (position.coords.longitude);
		
		var map_id = '#map-canvas';
		var lat = currentLat;
		var lng = currentLong;
		var zoom = 15;
		var map = initialize(map_id, lat, lng, zoom);
		var lat_long = createLatLong(lat, lng);
		
		return lat_long;	
	};
	function handle_errors(error) {

		switch(error.code) {
			case error.PERMISSION_DENIED:

				$scope.error = 'Choose a City and State from the form below or enable geolocation on your device.'
				break;

			case error.POSITION_UNAVAILABLE:
				$scope.error = 'We could not detect current position';
				break;

			case error.TIMEOUT:
				$scope.error = 'There was a server timeout.'
				break;

			default:
				$scope.error = 'There was an unknown error.';
				break;
		}
		//$scope.$apply();
	};

}]);

function initialize(map_id, lat, lng, zoom) {

	var myOptions = {
		zoom : zoom,
		center : new google.maps.LatLng(lat, lng),
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	return new google.maps.Map($(map_id)[0], myOptions);
}
  function createLatLong(lat, lng)
  {
  	return lat+','+lng;
  	
  }
