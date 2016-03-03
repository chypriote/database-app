appServices.factory('userService', ['$http', 'localStorageService', function ($http, localStorageService) {
	function isLogged() {
		return localStorageService.get('token');
	}

	function signup(name, email, password, onSuccess, onError) {
		$http.post('/api/auth/signup', {
			name: name,
			email: email,
			password: password
		})
		.then(function(response) {
			localStorageService.set('token', response.data.token);
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	}

	function login(email, password, onSuccess, onError) {
		$http.post('/api/auth/login', {
			email: email,
			password: password
		})
		.then(function(response) {
			localStorageService.set('token', response.data.token);
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
	}

	function logout() {
		localStorageService.remove('token');
	}

	function getToken() {
		return localStorageService.get('token');
	}

	return {
		isLogged: isLogged,
		signup: signup,
		login: login,
		logout: logout,
		getToken: getToken
	}
}]);

