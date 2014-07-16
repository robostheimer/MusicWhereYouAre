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
MusicWhereYouAreApp.directive('buttonToggle', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, attr, ctrl) {
            var classToToggle = attr.buttonToggle;
            element.bind('click', function() {
                var checked = ctrl.$viewValue;
                $scope.$apply(function(scope) {
                    ctrl.$setViewValue(!checked);
                });
            });

            $scope.$watch(attr.ngModel, function(newValue, oldValue) {
                newValue ? element.addClass(classToToggle) : element.removeClass(classToToggle);
            });
        }
    };
});

	

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