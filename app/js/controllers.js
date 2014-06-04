/* Controllers */


var PlaylistControllers = angular.module('PlaylistControllers', []);
PlaylistControllers.controller('PlaylistData', ['$scope', '$http', '$sce',
  function($scope, $http, $sce){
			
			$scope.spot_arr=[];
			$scope.spot_str=''
			$scope.url='http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&results=87&min_latitude=38.6362&max_latitude=39.1657&min_longitude=-77.276&max_longitude=-76.7476&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance&bucket=song_currency';	
			
			$http.get($scope.url).success(function(data)
			{
			$scope.songs = data.response.songs; // response data 
			for(var x=0; x<$scope.songs.length; x++ )
			{
				$scope.spot_arr.push($scope.songs[x].tracks[0].foreign_id.split(':')[2])
			
			}
			$scope.spot_str = 'https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE'+$scope.spot_arr.toString();
			$scope.spot_str=$sce.trustAsResourceUrl($scope.spot_str);
			});
			 //$scope.orderProp = 'song_currency';
			
			
		

			}]);


var MapControllers = angular.module('MapControllers', ["google-maps"])



MapControllers.controller('Geolocate', ['$scope','$window',"ui.map", "ui.event", function ($scope, $window) {
    if (navigator.geolocation) {
    	
			navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_errors);
		} else {
			$('#geolocation_alert').show();
			$('#geolocation_alert').html('<p>Choose a City and State from the form below or enable geolocation on your device.</p>');
		}
		function handle_geolocation_query(position)
		{
			$scope.currentLat = (position.coords.latitude + .05);
			$scope.currentLong = (position.coords.longitude + .05);
			$scope.currentLatRange = ($scope.currentLat - .05);
			$scope.currentLongRange = ($scope.currentLong - .05);
			
          	$scope.mapOptions={
			center: new google.maps.LatLng($scope.lat, $scope.lng), 
			zoom:15,
			mapTypeId:google.maps.MapTypeId.ROADMAP
			}
            $scope.$apply();
            
            var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
            $scope.model.myMap.setCenter(latlng);
            $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
           stubst
			
		}
		function handle_errors(error)
		{
		switch(error.code) {
		case error.PERMISSION_DENIED:
			$scope.error='Choose a City and State from the form below or enable geolocation on your device.'
			break;

		case error.POSITION_UNAVAILABLE:
			$scope.error='We could not detect current position';
			break;

		case error.TIMEOUT:
			$scope.error ='There was a server timeout.'
			break;

		default:
			$scope.error='There was an unknown error.';
			break;
		}
	}
	
        
 
   
}]);




  function LoadMap($scope, $timeout, $log, $http, lat, long) {
        // Enable the new Google Maps visuals until it gets enabled by default.
    // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
   console.log(lat);
    google.maps.visualRefresh = true;

    versionUrl = window.location.host === "rawgithub.com" ? "http://rawgithub.com/nlaplante/angular-google-maps/master/package.json" : "/package.json";

    $http.get(versionUrl).success(function (data) {
        if (!data)
            console.error("no version object found!!");
        $scope.version = data.version;
    });


	$scope.center= {
                latitude: 45,
                longitude: -74
           };
     $scope.control = {};      
     $scope.zoom = 5;  
     $scope.options= {
                disableDefaultUI: true,
                panControl: false,
                navigationControl: false,
                scrollwheel: false,
                scaleControl: false
           };
     $scope.refresh= function () {
                $scope.map.control.refresh(origCenter);
            } ;          
    
}

var InfoControllers = angular.module('InfoControllers', [])
InfoControllers.controller('LoadInfo', ['$scope','$http',
  function($scope, $http) {
  	alert('info')
  }]);
  
var FavoritesControllers = angular.module('FavoritesControllers', [])
FavoritesControllers.controller('LoadFav', ['$scope','$http',
  function($scope, $http) {
  	alert('favorite')
  }]); 

var LinerNotesControllers = angular.module('LinerNotesControllers', [])
LinerNotesControllers.controller('WriteLinerNotes', ['$scope','$http',
  function($scope, $http) {
  	alert('liner notes')
  }]);   
