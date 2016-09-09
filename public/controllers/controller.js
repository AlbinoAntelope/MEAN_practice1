var myApp = angular.module("myApp", []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

	$http.get('/contactList').success(function (response) {
		console.log('contactList Received')
		$scope.contactList = response;
	});

    
}]);
