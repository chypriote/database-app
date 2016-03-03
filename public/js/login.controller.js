appControllers.controller('LoginController', ['$location', 'userService', function ($location, userService) {
	var vm = this;

	vm.login = function() {
		console.log('logging in!');
		userService.login(
			vm.email, vm.password,
			function(response) {
				$location.path('/');
			},
			function(response) {
				console.log('Something went wrong');
			});
	}
	vm.email = '';
	vm.password = '';
	if (userService.isLogged())
		$location.path('/');
}]);
