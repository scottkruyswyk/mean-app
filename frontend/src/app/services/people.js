angular.module('myApp.services', [])
.factory('people', people);

people.$inject = ['$http'];

function people($http) {
	var apiUrl = "http://localhost:8080/person";
	
	var service = {
		getPeople: getPeople,
		getPersonById: getPersonById
	};

	return service;


	function getPeople() {
		return $http.get(apiUrl);
	}

	function getPersonById(id) {
		var url = apiUrl + '/' + id;
		return $http.get(url);
	}
}

