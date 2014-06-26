'use strict';

/* Directives */

MusicWhereYouAreApp.directive('mwyaMap', function(getLocation) {
	return function($rootScope)
	{	
		if(window.location.hash.split('/').length<=2)
		{
			
		if (navigator.geolocation) {
				/////If it is is runs the handle_geolocation_query or the handle Gelocation.handle)errors function if access to the Geolocation API is denied by the user
  			
			getLocation.checkGeoLocation();

			} else {

				$('#geolocation_alert').show();

			}
		}	

};

});
MusicWhereYouAreApp.directive('mwyaMarker', function(getLocation) {
	return function($rootScope)
	{
		
	};
	});	