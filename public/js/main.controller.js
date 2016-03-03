appControllers.controller('MainController', ['$location', 'userService', 'dataService', function ($location, userService, dataService) {
	var vm = this;

	vm.logout = function() {
		userService.logout();
		$location.path('/login');
	}

	vm.refresh = function() {
		dataService.getAll('sites', function(response) {
			vm.sites = response;
		}, function() {
			console.log('Error with API');
		});
		dataService.getAll('actors', function(response) {
			vm.actors = response;
		}, function() {
			console.log('Error with API');
		});
		dataService.getAll('videos', function(response) {
			vm.videos = response;
		}, function() {
			console.log('Error with API');
		});
	}

	vm.create = function() {
		siteService.create({
			name: vm.currentSiteName,
			url: vm.currentSiteUrl
		}, 'sites', function(){
			$('#addSiteModal').modal('toggle');
			vm.currentSiteReset();
			vm.refresh();
		}, function(){
			console.log('error adding the site');
		})
	}

	vm.currentSiteReset = function() {
		vm.currentSiteName = '';
		vm.currentSiteUrl = '';
	}

	if (!userService.isLogged())
		$location.path('/login');
	vm.sites = [];
	vm.actors = [];
	vm.videos = [];
	vm.currentSiteReset();
	vm.refresh();
}]);
