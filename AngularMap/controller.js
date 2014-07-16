'use strict'
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

/*function PlaylistData()
{
	
}*/
/*
var MapControllers = angular.module('MusicWhereYouAreApp', ["google-maps"])
MapControllers.controller('LoadMap', ['$scope','$timeout', '$log', '$http',
  function($scope, $timeout, $log, $http) {
        // Enable the new Google Maps visuals until it gets enabled by default.
    // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
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
  
        
      
  

    //var origCenter = {latitude: $scope.center.latitude, longitude: $scope.center.longitude};
}]);*/
