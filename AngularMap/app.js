'use strict';

/* App Module */

var MusicWhereYouAreApp = angular.module('MusicWhereYouAreApp', [
  'ngRoute',
  'PlaylistControllers',
 
]);

MusicWhereYouAreApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
       // templateUrl: 'partials/phone-list.html',
        controller: 'PlaylistData'
      }).
    
      otherwise({
        redirectTo: '/home'
      });
  }]);