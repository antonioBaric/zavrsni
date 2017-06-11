var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
	$routeProvider
	.when('/', {
		templateUrl: './views/home.html',
		controller: 'homeController'
	})
	.when('/testOnly', {
		templateUrl: './views/testOnly.html',
        controller: 'testController'
    })
	.when('/login', {
		templateUrl: './views/login.html'
	})
	.when('/ustanove', {
		templateUrl: './views/ustanove.html',
		controller: 'ustanoveController'
	})
	.when('/ustanove/:ustanovaId', {
		templateUrl: './views/ustanova.html',
		controller: 'ustanovaController'
	})
	.when('/odjeli', {
		templateUrl: './views/uIzradi.html',
		controller: 'odjeliController'
	})
	.when('/odjeli/:odjelId', {
		templateUrl: './views/odjel.html',
		controller: 'odjelController'
	})
	.when('/oNama', {
		templateUrl: './views/oNama.html'
	})
	.when('/kontakt', {
		templateUrl: './views/kontakt.html'
	})
	.otherwise(
	{redirectTo: '/'}
	);
});