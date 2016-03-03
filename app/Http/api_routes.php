<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

	$api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
	$api->post('auth/signup', 'App\Api\V1\Controllers\AuthController@signup');
	$api->post('auth/recovery', 'App\Api\V1\Controllers\AuthController@recovery');
	$api->post('auth/reset', 'App\Api\V1\Controllers\AuthController@reset');

	// example of protected route
	$api->get('protected', ['middleware' => ['api.auth'], function () {
		return \App\User::all();
		}]);
	$api->group(['middleware' => 'api.auth'], function ($api) {
		$api->resource('sites', 'App\Api\V1\Controllers\SiteController');
		$api->resource('actors', 'App\Api\V1\Controllers\ActorController');
		$api->resource('videos', 'App\Api\V1\Controllers\VideoController');
	});

	// example of free route
	$api->get('free', function() {
		return \App\User::all();
	});

});
