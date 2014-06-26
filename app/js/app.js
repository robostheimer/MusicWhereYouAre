'use strict';

/* App Module */

var MusicWhereYouAreApp = angular.module('MusicWhereYouAreApp', [
  'ngRoute',
  'PlaylistControllers',
  'UI-Loader',
  'InfoControllers',
  'FavoritesControllers',
  'LinerNotesControllers',
  'ui.utils',
  'Forms'
 
   
]);

MusicWhereYouAreApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/playlist', {
        templateUrl: 'partials/playlist.html',
       controller: 'Hider'
      }).
       when('/favorites', {
        templateUrl: 'partials/favorites.html',
        controller: 'LoadFav'
      }).
        when('/genres', {
        templateUrl: 'partials/genre.html',
        //controller: 'PlaylistData'
      }).
       when('/info', {
        templateUrl: 'partials/info.html',
        controller: 'LoadInfo'
      }).
      when('/liner_notes', {
        templateUrl: 'partials/liner_notes.html',
        controller: 'WriteLinerNotes'
      }).
     
      when('/map', {
      	 templateUrl: 'partials/map.html',
      	controller: 'Hider'
      
      }).
    when('/map/:location',
    {
    	templateUrl:'partials/map.html',
    	controller:'hashedLocation'
    	
    }).
     when('/playlist/:location',
    {
    	templateUrl:'partials/playlist.html',
    	controller:'hashedLocation'
    }).
    when('/favorites/:location', {
        templateUrl: 'partials/favorites.html',
        controller: 'LoadFav'
      }).
       when('/genres/:location', {
        templateUrl: 'partials/genre.html',
        //controller: 'PlaylistData'
      }).
        when('/info/:location', {
        templateUrl: 'partials/info.html',
        controller: 'LoadInfo'
      }).
      otherwise({
        redirectTo: '/map'
      });
  }]);


MusicWhereYouAreApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});