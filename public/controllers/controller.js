var myApp = angular.module("myApp", []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    //refresh the list of contacts
    var refresh = function () {
    	$http.get('/contactList').then(
    		function listReceived (response) {
				console.log('contactList Received')
				console.log(response);
				$scope.test = "testing"
				$scope.contactList = response.data;
				$scope.contact = "";
			}, function listError (error) {
				console.log(error)
			});
    };
	
	refresh();

	//add the contact
   	$scope.addContact = function  () {
		console.log($scope.contact);
		$http.post('/contactList', $scope.contact).then(
			function contactAdded (response) {
				console.log("contact added");
				console.log(response);
				refresh();
			}, function addContactError (error) {
				console.log(error);
			});	
	};

	//remove a contact
	$scope.removeContact = function (id) {
		console.log(id);
		$http.delete('/contactList/' + id, $scope.contact).then(
			function contactRemoved (response) {
				console.log("contact removed");
				refresh();
			}, function removeContactError (error) {
				console.log(error);
			});	
	};

	//edit a contact
	$scope.editContact = function (id) {
		console.log(id);
		$http.get('/contactList/' + id, $scope.contact).then(
			function (response) {
				console.log(response);
				$scope.contact = response.data;
			}, function (error) {
				console.log(error);
			});	
	};

	//update a contact
	$scope.updateContact = function () {
		id = $scope.contact._id
		console.log(id);
		$http.put('/contactList/' + id, $scope.contact).then(
			function (response) {
				console.log(response);
				refresh();
			}, function (error) {
				console.log(error);
			});	
	};

	//clear the input bar
	$scope.clearContact = function (id) {
		$scope.contact = "";	
	};
}]);
