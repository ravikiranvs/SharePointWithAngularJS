(function () {
    'use strict';

    var app = angular.module(MainAppName);

    app.config(function ($routeProvider) {
        $routeProvider

			// route to the home page
			.when('/', {
			    templateUrl: '../App/Pages/home.html',
			    controller: 'HomePageCtrl'
			})
            // implement other routes

            // redirect to home page for anything else
            .otherwise({ redirectTo: '/' });
    });

})();