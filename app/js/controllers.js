/* Controllers */


var PlaylistControllers = angular.module('PlaylistControllers', []);
PlaylistControllers.controller('removeFromPlaylist', ['$scope','$rootScope', '$sce','getLocation',
  function($scope, $rootScope ){
			
		//listener for 'x' button to remove item from playlist
		///May want to create a service so it works for the favorites buttons too
			}]);
PlaylistControllers.controller('testcall', ['$scope', '$rootScope', 'PlaylistCreate','MapCreate','$q',
  function($scope, $rootScope, PlaylistCreate,MapCreate, $q ){
			$rootScope.currentLat=51;
			$rootScope.currentLong=.12;
			var deferred = $q.defer();	
			deferred.promise.then(PlaylistCreate.runPlaylist()).then(MapCreate.runMap());
			deferred.resolve();
			}]);


angular.module('UI-Loader', [])
	.controller('Geolocate', ['$scope','$window','$http', '$sce', 'getLocation', function ($scope, $window, $http, $sce,getLocation ) {
  		
  		if($('#map-canvas').html().match('MusicWhereYouAre/loading.gif" alt="loading"'))
  		{
  		getLocation.checkGeoLocation();
  		}
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
