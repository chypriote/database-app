appControllers.controller('SignupController', ['$location', 'userService', function ($location, userService) {
	var vm = this;

	vm.signup = function() {
		userService.signup(
			vm.name, vm.email, vm.password,
			function(response) {
				console.log('User ' + vm.name + ' signed in');
				$location.path('/');
			},
			function(response) {
				console.log('Something went wrong');
			});
	}
	vm.name = '';
	vm.email = '';
	vm.password = '';

	if (userService.isLogged())
		$location.path('/');
}]);
