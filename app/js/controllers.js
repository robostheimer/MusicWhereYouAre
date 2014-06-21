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

/*angular.module('UI-Loader', ['google-maps'])
	.controller('Geolocate', ['$scope','$window','$http', '$sce', 'getLocation', '$rootScope','$q', function ($scope, $window, $http, $sce,getLocation, 			 $q, $rootScope ) {
  		
  		if($('#map-canvas').html().match('loading.gif"')||window.location.hash.split('/')<2)
  		{
  		var deferred_geo = $q.defer();
  		deferred_geo.promise.
  		then
  		(
  			getLocation.checkGeoLocation()
  		).
  		then(
  			loadMap($rootScope.currentLat, $rootScope.currentLong)
    		)
  		
  		
  		}
}]);*/
angular.module('UI-Loader', [])
	.controller('Geolocate', ['$scope','$window','$http', '$sce', 'getLocation', function ($scope, $window, $http, $sce,getLocation ) {
  		
  		if($('#map-canvas').html().match('loading.gif"')||window.location.hash.split('/')<2)
  		{
  		getLocation.checkGeoLocation();
  		
  		}
}])

  	.controller('Hider', function()
  	{
  		$('#geolocation_alert').show();
  		$('#map-canvas').hide();
  		$('#spot_holder').hide();
  	});	







  
angular.module('Forms',[])
	.controller('formController', ['$scope', '$rootScope','retrieveLocation','getLocation','$q','HashCreate', function($scope, $rootScope, retrieveLocation, getLocation, $q, HashCreate){
		
		$scope.controlForm = function(location)
		{
			
			if(location==null || location=="")
			{
			var deferred_loc = $q.defer();
			deferred_loc.promise.then(getLocation.checkGeoLocation()).then(HashCreate.runHash());
			deferred_loc.resolve();		
			}
			else
			{	
			retrieveLocation.runLocation(replacePatterns(location));				
			}
			
		};
		
    
    
	}])
	.controller('hashedLocation', ['$scope', '$rootScope','retrieveLocation', function($scope, $rootScope, retrieveLocation){
		
						
			var location = window.location.hash;
			location=location.replace(/\*/g,', ')
			retrieveLocation.runLocation(replacePatterns(location));				
			
		
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


function replacePatterns(str) {
	str = str.replace('#/map/','')
	str = str.replace('#/playlist/','');
	str = str.replace(/_/g, ' ');
	str = str.replace(/St. /i, 'Saint ');
	str = str.replace(/St /i, 'Saint ');
	str = str.replace('New York, ', 'New York City, ');

	return str;
}


function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}