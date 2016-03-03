'use strict';

module.exports = /*@ngInject*/ function ($location, userService) {
	var vm = this;

	vm.signup = function () {
		userService.signup(
			vm.name, vm.email, vm.password,
			function () {
				console.log('User ' + vm.name + ' signed in');
				$location.path('/');
			},
			function () {
				console.log('Something went wrong');
			});
	};
	vm.name = '';
	vm.email = '';
	vm.password = '';

	if (userService.isLogged()) {
		$location.path('/');
	}
};
