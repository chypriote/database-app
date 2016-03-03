appServices.factory('dataService', ['Restangular', 'userService', function (Restangular, userService) {
	function getAll(route, onSuccess, onError) {
		Restangular.all('api/' + route).getList()
			.then(function(response) {
				onSuccess(response);
			}, function(response) {
				onError(response);
			});
	}

	function getById(siteId, route, onSuccess, onError) {
		Restangular.one('api/' + route, siteId).get()
			.then(function(response){
				onSuccess(response);
			}, function(response) {
				onError(response);
			});
	}

	function create(data, route, onSuccess, onError) {
		Restangular.all('api/' + route).post(data)
			.then(function(response) {
				onSuccess(response);
			}, function(response) {
				onError(response);
			});
	}

	function update(siteId, data, route, onSuccess, onError) {
		Restangular.one('api/' + route).customPUT(data, siteId)
			.then(function(response) {
				onSuccess(response);
			}, function(response) {
				onError(response);
			});
	}

	function remove(siteId, route, onSuccess, onError) {
		Restangular.one('api/' + route, siteId).remove()
			.then(function() {
				onSuccess();
			}, function() {
				onError();
			});
	}

	Restangular.setDefaultRequestParams({'token' : userService.getToken()});

	return {
		getAll: getAll,
		getById: getById,
		create: create,
		update: update,
		remove: remove
	};
}]);
