'use strict';

module.exports = /*@ngInject*/ function () {
	return {
		restrict: 'A',
		template: '<i ng-repeat="star in stars" class="text-primary glyphicon glyphicon-star">',
		scope: {
			rating: '='
		},
		link: function (scope) {
			scope.stars = [];
			for (var i = 0; i < scope.rating; i++) {
				scope.stars.push({filled: i < 5});
			}
		}
	};
};
