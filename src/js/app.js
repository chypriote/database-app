'use strict';

global.jQuery = require('jquery');
require('bootstrap');

var angular = require('angular');
require('angular-route');
require('restangular');
require('lodash');

angular.module('databaseApp', ['ngRoute', 'restangular', 'LocalStorageModule']);

require('./services');
require('./auth');
require('./directives');

angular.module('databaseApp').controller('MainController', require('./main.controller'));

angular.module('databaseApp')
.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginController',
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
		.otherwise({redirectTo: '/'});
}]);

angular.module('databaseApp')
.config(function (RestangularProvider) {
	RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) { //eslint-disable-line
		var extractedData;
		if (operation === 'getList' && url === '/api/sites') {
			extractedData = data.sites;
		} else if (operation === 'getList' && url === '/api/actors') {
			extractedData = data.actors;
		} else if (operation === 'getList' && url === '/api/videos') {
			extractedData = data.videos;
		} else {
			extractedData = data.data;
		}
		return extractedData;
	});
});
