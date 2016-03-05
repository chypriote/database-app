'use strict';

module.exports = /*@ngInject*/ function ($location, userService) {
	var vm = this;

	vm.login = function () {
		vm.errorMessage = '';
		userService.login(
			vm.email, vm.password,
			function () {
				$location.path('/');
			},
			function (response) {
				if (response.status === 401) {
					vm.errorMessage = 'Unrecognized account';
				} else {
					vm.errorMessage = 'There was an error, please refresh the page and try again.';
				}
			});
	};

	vm.errorMessage = '';
	vm.email = '';
	vm.password = '';
	if (userService.isLogged()) {
		$location.path('/');
	}
};
