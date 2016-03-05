'use strict';

module.exports = /*@ngInject*/ function ($location, userService, dataService) {
	var vm = this;
	var usv = userService;
	var dsv = dataService;
	var angular = require('angular');

	vm.logout = function () {
		usv.logout();
		$location.path('/login');
	};

	vm.refresh = function () {
		dsv.getAll('videos', function (response) {
			console.log(response);
			vm.videos = response;
		}, function () {
			console.log('Error with API');
		});
	};

	vm.create = function () {
		dsv.create({
			name: vm.currentSiteName,
			url: vm.currentSiteUrl
		}, 'sites', function () {
			angular.element('#addSiteModal').modal('toggle');
			vm.currentSiteReset();
			vm.refresh();
		}, function () {
			console.log('error adding the site');
		});
	};

	vm.currentSiteReset = function () {
		vm.currentSiteName = '';
		vm.currentSiteUrl = '';
	};

	if (!usv.isLogged()) {
		$location.path('/login');
	}
	vm.videos = [];
	vm.currentSiteReset();
	vm.refresh();
};
