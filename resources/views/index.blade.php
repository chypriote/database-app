<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Video database</title>
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<style>
			li {padding-bottom: 8px;}
		</style>
	</head>

	<body ng-app="databaseApp">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<h1>Book Wishlist Application</h1>
				</div>
			</div>
			<ng-view></ng-view>
		</div>
		<script src="js/vendors/angular.js"></script>
		<script src="js/vendors/lodash.min.js"></script>
		<script src="js/vendors/angular-route.js"></script>
		<script src="js/vendors/angular-local-storage.js"></script>
		<script src="js/vendors/restangular.js"></script>
		<script src="js/app.js"></script>
		<script src="js/user.service.js"></script>
		<script src="js/data.service.js"></script>
		<script src="js/main.controller.js"></script>
		<script src="js/login.controller.js"></script>
		<script src="js/signup.controller.js"></script>
		<script src="js/vendors/jquery.min.js"></script>
		<script src="js/vendors/bootstrap.min.js"></script>
	</body>
</html>
