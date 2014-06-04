'use strict';

/* App Module */

var MusicWhereYouAreApp = angular.module('MusicWhereYouAreApp', [
  'ngRoute',
  'PlaylistControllers',
  'MapControllers',
  'InfoControllers',
  'FavoritesControllers',
  'LinerNotesControllers', 
]);

MusicWhereYouAreApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/playlist', {
        templateUrl: 'partials/playlist.html',
        controller: 'PlaylistData'
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
      /*when('/home', {
      	 templateUrl: 'partials/home.html',
      	controller:'LoadMap'
      }).*/
    
      otherwise({
        redirectTo: '/home'
      });
  }]);
