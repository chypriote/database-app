'use strict';

module.exports = /*@ngInject*/ function ($location, userService) {
	var vm = this;

	vm.login = function () {
		userService.login(
			vm.email, vm.password,
			function () {
				$location.path('/');
			},
			function () {
				console.log('Something went wrong');
			});
	};
	vm.email = '';
	vm.password = '';
	if (userService.isLogged()) {
		$location.path('/');
	}
};
