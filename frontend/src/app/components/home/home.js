angular.module('myApp.home', ['myApp.services'])
.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['people'];

function homeCtrl(people){
	var vm = this;
	vm.addUser = addUser;

	activate();

	function activate() {
		
	}

	function addUser() {

	}
}