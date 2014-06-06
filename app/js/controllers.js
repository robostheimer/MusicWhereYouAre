/* Controllers */


var PlaylistControllers = angular.module('PlaylistControllers', []);
PlaylistControllers.controller('PlaylistData', ['$scope', '$http', '$sce',
  function($scope, $http, $sce){
			
		
			
			
		

			}]);


angular.module('MapControllers', [])
	.controller('Geolocate', ['$scope','$window','$http', '$sce', function ($scope, $window, $http, $sce ) {
  		
		$scope.getLocation = function () {
		$scope.mapOptions={
			center: new google.maps.LatLng($scope.currentLat, $scope.currentLong), 
			zoom:15,
			mapTypeId:google.maps.MapTypeId.ROADMAP
			};
		    if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.handle_geolocation_query, $scope.handle_errors);
                  }
                  
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }; 
		$scope.handle_geolocation_query= function(position)
		{
		
			
			$scope.currentLat = (position.coords.latitude);
			$scope.currentLong = (position.coords.longitude);
			
						
        	$scope.buildPlaylist($scope.currentLat, $scope.currentLong)
         
           
		};
		$scope.handle_errors = function(error)
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
			$scope.$apply();
		};
		
		$scope.buildPlaylist = function(lat, long)
		{
			$scope.lat_min = $scope.currentLat-.5;
			$scope.lat_max = $scope.currentLat+.5;
			$scope.long_min = $scope.currentLong-.5;
			$scope.long_max = $scope.currentLong+.5         
			$scope.spot_arr=[];
			$scope.location_arr=[];
			$scope.spot_str=''
			$scope.url='http://developer.echonest.com/api/v4/song/search?api_key=3KFREGLKBDFLWSIEC&format=json&results=87&min_latitude='+$scope.lat_min+'&max_latitude='+$scope.lat_max+'&min_longitude='+$scope.long_min+'&max_longitude='+$scope.long_max+'&bucket=artist_location&bucket=id:spotify-WW&bucket=tracks&limit=true&&song_type=studio&sort=song_hotttnesss-desc&rank_type=relevance&bucket=song_currency';	
			
			$http.get($scope.url).success(function(data)
			{
			$scope.songs = data.response.songs; // response data 
			for(var x=0; x<$scope.songs.length; x++ )
			{
				$scope.spot_arr.push($scope.songs[x].tracks[0].foreign_id.split(':')[2])
				$scope.location_arr.push($scope.songs[x].artist_location.latitude, $scope.songs[x].artist_location.longitude)
			}
			$scope.spot_str = 'https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE'+$scope.spot_arr.toString();
			$scope.spot_str=$sce.trustAsResourceUrl($scope.spot_str);
			$scope.buildMap(lat, long, $scope.location_arr);
			});
			
		};
		$scope.buildMap = function(lat, long, arr)
		{
			console.log(arr)
			$scope.map;
				$scope.LatLng = new google.maps.LatLng(lat, long)
	          	$scope.mapOptions={
				center: $scope.LatLng, 
				zoom:15,
				mapTypeId:google.maps.MapTypeId.ROADMAP, 
				draggable:true
				};
				$scope.map = new google.maps.Map(document.getElementById('map-canvas'), $scope.mapOptions);	
				
				$scope.marker_image = '/MusicWhereYouAre/genre_icons/marker_sm.png';
				$scope.geomarker = new google.maps.Marker({
				      position: $scope.LatLng,
				      map: $scope.map,
				      icon: $scope.marker_image
	 			 });
		
		};
     $scope.getLocation(); 
	 	
	
   
}])
.directive('mwyaMap', function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'partials/map.html'
    };
  });



  

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
