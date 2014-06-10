/* Controllers */


var PlaylistControllers = angular.module('PlaylistControllers', []);
PlaylistControllers.controller('PlaylistData', ['$scope', '$http', '$sce','getLocation',
  function($scope, $http, $sce, GetLocation){
			
		//getLocation.checkLocation();
			
		
		

			}]);



angular.module('UI-Loader', [])
	.controller('Geolocate', ['$scope','$window','$http', '$sce', 'getLocation', function ($scope, $window, $http, $sce,getLocation ) {
  		getLocation.checkGeoLocation();
  		
}]);
  

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
