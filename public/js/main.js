var app = angular.module('RoundRobin', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider.state('story', {
		url: '/story',
		templateUrl: '../templates/story.html',
		controller: 'StoryCtrl'
	})

	$stateProvider.state('signin', {
		url: '/signin',
		templateUrl: '../templates/signin.html',
		controller: 'StoryCtrl'
	})

	$urlRouterProvider.otherwise('/signin');
});