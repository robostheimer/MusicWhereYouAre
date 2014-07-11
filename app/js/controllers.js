/* Controllers */

angular.module('UI-Loader', []).controller('Geolocate', ['$scope', '$window', '$http', '$sce', 'getLocation', '$rootScope', '$q',
function($scope, $window, $http, $sce, getLocation, $q, $rootScope) {

	if ($('#map-canvas').html().match('loading.gif"') || window.location.hash.split('/') < 2) {
		getLocation.checkGeoLocation();

	}
}]).controller('Hider', function() {

	$('#geolocation_alert').show();
	$('#map-canvas').hide();
	$('#spot_holder').hide();

});

angular.module('Forms', []).controller('formController', ['$scope', '$rootScope', 'retrieveLocation', 'getLocation', '$q', 'HashCreate', '$location',
function($scope, $rootScope, retrieveLocation, getLocation, $q, HashCreate, $location) {
	$scope.controlForm = function(location) {
		$scope.location = location;
		$scope.genres = '';
		if ($scope.location == null || $scope.location == "") {
			var deferred_loc = $q.defer();
			getLocation.checkGeoLocation();
		} else {
			retrieveLocation.runLocation(replacePatterns($scope.location), $scope.genres);
		}

	};

}]).controller('hashedLocation', ['$scope', '$rootScope', 'retrieveLocation', '$location', '$routeParams', '$q',
function($scope, $rootScope, retrieveLocation, $location, $routeParams, $q) {
	
	$scope.location = $routeParams.location;
	//$scope.genre='';
	///Grabbing Genres/////////
	//$rootScope.genres='';	
	$scope.location = $scope.location.replace(/\*/g, ', ');
	$scope.$$phase || $scope.$apply();
	
	retrieveLocation.runLocation(replacePatterns($scope.location), $rootScope.genres);
		
}]);

angular.module('Genre', [])
.controller('GenreController',  ['$scope','$routeParams','retrieveLocation','$location','$rootScope', '$q', 'loadGenreCheckData',function($scope, $routeParams, retrieveLocation, $location, $rootScope, $q, loadGenreCheckData) {
/////////////////////////Move this object to Services and bring it in? -- See TAS Project////////////////////////
		$scope.Genre=loadGenreCheckData.getGenre();
		$scope.avant_garde = $scope.Genre[0].genre;
		$scope.blues = $scope.Genre[1].genre;
		$scope.classic_rock = $scope.Genre[2].genre;
		$scope.classical = $scope.Genre[3].genre;
		$scope.comedy = $scope.Genre[4].genre;
		$scope.country = $scope.Genre[5].genre;
		$scope.drama = $scope.Genre[6].genre;
		$scope.electronic = $scope.Genre[7].genre;
		$scope.folk = $scope.Genre[8].genre;
		$scope.hip_hop = $scope.Genre[9].genre;
		$scope.holiday = $scope.Genre[10].genre;
		$scope.indie = $scope.Genre[11].genre;
		$scope.jazz = $scope.Genre[12].genre;
		$scope.kid_music = $scope.Genre[13].genre;
		$scope.latin = $scope.Genre[14].genre;
		$scope.new_age = $scope.Genre[15].genre;
		$scope.motown = $scope.Genre[16].genre;
		$scope.pop = $scope.Genre[17].genre;
		$scope.rock = $scope.Genre[18].genre;
		$scope.soft_rock = $scope.Genre[19].genre;
		$scope.world = $scope.Genre[20].genre;
		$scope.location = $routeParams.location;
		$scope.genre_hash='';
		$scope.genre_str = $rootScope.genres;
		$scope.genre_str_split = $scope.genre_str.split('***');
		
		for(var x=0; x<$scope.Genre.length; x++)
		{
			$scope.Genre[x].genre.state ="off";
			for(var i=0; i<$scope.genre_str_split.length; i++)
			{
				if($scope.genre_str_split[i].replace('*', '')==$scope.Genre[x].genre.similarGenres){
						console.log($scope.Genre[x].genre.genre);
						$scope.Genre[x].genre.checked=true;
						$scope.Genre[x].genre.isSelected = true;
						$scope.Genre[x].genre.state ="on";
				}		
			}
		}
	
$scope.genre_hash= $location.path()+'/'+$rootScope.genres;			
retrieveLocation.runLocation(replacePatterns($scope.location.replace('*', ', ')), $rootScope.genres);
		
		if($routeParams.genre!==undefined)
		{
			$rootScope.genres = $routeParams.genre;
		}
		
		$scope.checkGenre= function(genre)
		{	
			$rootScope.genres="";
			
			for(var x=0 ; x<$scope.Genre.length; x++)
				{
					
					if(genre==$scope.Genre[x].genre.genre && $scope.Genre[x].genre.state=='off')
					{
						$scope.Genre[x].genre.state='on';		
					}
					
					else if(genre==$scope.Genre[x].genre.genre && $scope.Genre[x].genre.state=='on')
					{
						$scope.Genre[x].genre.state='off';
					}
					if($scope.Genre[x].genre.state=='on')
					{
						$rootScope.genres+='****'+$scope.Genre[x].genre.similarGenres;
					}
					}
				if($rootScope.genres =="")
					{
						$rootScope.genres ='****';
					}
		$scope.location = $scope.location.replace(/\*/g, ', ');
		
		retrieveLocation.runLocation(replacePatterns($scope.location), $rootScope.genres);
	
		$scope.genre_hash= $location.path()+'/'+$rootScope.genres;		
		};

	}]);


var InfoControllers = angular.module('InfoControllers', [])
InfoControllers.controller('LoadInfo', ['$scope', '$http',
function($scope, $http) {
	alert('info')
}]);

var FavoritesControllers = angular.module('FavoritesControllers', [])
FavoritesControllers.controller('LoadFav', ['$scope', '$http',
function($scope, $http) {
	alert('favorite')
}]);

var LinerNotesControllers = angular.module('LinerNotesControllers', [])
LinerNotesControllers.controller('WriteLinerNotes', ['$scope', '$http',
function($scope, $http) {
	alert('liner notes')
}]);

var GenreControllers = angular.module('InfoControllers', [])
InfoControllers.controller('LoadGenre', ['$scope', '$http',
function($scope, $http) {
	alert('genre')
}]);


/////////////////Helper Functions////////////////////

function replacePatterns(str) {
	str = str.replace('#/map/', '')
	str = str.replace('#/playlist/', '');
	str = str.replace(/_/g, ' ');
	str = str.replace(/St. /i, 'Saint ');
	str = str.replace(/St /i, 'Saint ');
	str = str.replace('New York, ', 'New York City, ');

	return str;
}

function locationReplace(str) {
	str = str.replace(', ', '*');
	str = str.replace(',', '*');
	str = str.replace(/ /g, '_');
	return str
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}