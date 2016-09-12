angular.module('myApp.services', [])
.factory('people', people);

people.$inject = ['$http'];

function people($http) {
	var apiUrl = 'http://localhost:8080/api/people';
	
	var service = {
		getPeople: getPeople,
		getPersonById: getPersonById,
		createPerson: createPerson
	};

	return service;


	function getPeople() {
		return $http.get(apiUrl);
	}

	function getPersonById(id) {
		var url = apiUrl + '/' + id;
		return $http.get(url);
	}

	function createPerson(person) {
		return $http.post(apiUrl, person);
	}
}

