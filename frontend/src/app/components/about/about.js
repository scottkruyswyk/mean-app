angular.module('myApp.about', [])
.controller('aboutCtrl', aboutCtrl);

aboutCtrl.$inject = [];

function aboutCtrl(){
	var vm = this;
	vm.aboutText = 'Put some content here';
};