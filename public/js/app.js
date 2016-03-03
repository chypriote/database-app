var app = angular.module('databaseApp', ['ngRoute', 'appServices', 'appControllers']);
var appServices = angular.module('appServices', ['LocalStorageModule', 'restangular']);
var appControllers = angular.module('appControllers', []);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'LoginController',
			controllerAs: 'login'
		})
		.when('/signup', {
			templateUrl: 'partials/signup.html',
			controller: 'SignupController',
			controllerAs: 'signup'
		})
		.when('/', {
			templateUrl: 'partials/index.html',
			controller: 'MainController',
			controllerAs: 'main'
		})
		.otherwise({redirectTo: '/'})
}]);

app.config(function(RestangularProvider) {
	RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
		var extractedData;
		if (operation === "getList" && url === '/api/sites') {
			extractedData = data.sites;
		} else if (operation === "getList" && url === '/api/actors') {
			extractedData = data.actors;
		} else if (operation === "getList" && url === '/api/videos') {
			extractedData = data.videos;
		} else {
			extractedData = data.data;
		}
		return extractedData;
	});
});
