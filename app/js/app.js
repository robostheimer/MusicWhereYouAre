'use strict';

/* App Module */

var MusicWhereYouAreApp = angular.module('MusicWhereYouAreApp', [
  'ngRoute',
  'Genre',
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
       //controller: 'locationHash'
      }).
       when('/favorites', {
        templateUrl: 'partials/favorites.html',
        controller: 'LoadFav'
      }).
        when('/genres', {
        templateUrl: 'partials/genres.html',
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
      	controller: 'Geolocate'
      
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
     when('/genres/:location',
    {
    	templateUrl:'partials/genres.html',
    	controller:'GenreController'
    }).
  
    when('/favorites/:location', {
        templateUrl: 'partials/favorites.html',
        controller: 'LoadFav'
      }).
    
        when('/info/:location', {
        templateUrl: 'partials/info.html',
        controller: 'LoadInfo'
      }).
      
   
    when('/genres/:location/:genre',
    {
    	templateUrl:'partials/genres.html',
    	controller:'GenreController'
    }).
      otherwise({
        redirectTo: '/map'
      });
  }]);


