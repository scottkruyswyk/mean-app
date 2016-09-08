require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('./services/people.js');
require('./components/home/home.js');
require('./components/about/about.js');

var app = angular.module('myApp', ['ui.router','ngMaterial','myApp.home','myApp.about']);

app.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");
	
	$stateProvider
	.state('home', {
		url: "/",
		views : {
			"" : {
				templateUrl:"app/components/home/home.html",
				controller: 'homeCtrl',
				controllerAs: 'vm'
			},
			"header@home":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	})
	.state('about', {
		url: "/about",
		views : {
			"" : {
				templateUrl:"app/components/about/about.html",
				controller: 'aboutCtrl',
				controllerAs: 'vm'
			},
			"header@about":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	});
});