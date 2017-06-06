var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: './views/home.html',
		controller: 'homeController'
	})
	.otherwise(
	{redirectTo: '/'}
	);
});