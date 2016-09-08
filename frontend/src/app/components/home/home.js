angular.module('myApp.home', ['myApp.services'])
.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['people'];

function homeCtrl(people){
	var vm = this;

	activate();

	function activate() {
		people.getPeople().then(function(response) {
			vm.welcomeText = JSON.stringify(response.data.People);
		}, function(error) {
			vm.errorText = error;
		});
	}
};