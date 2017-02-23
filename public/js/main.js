var app = angular.module('RoundRobin', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider.state('story', {
		url: '/story',
		templateUrl: '../templates/story.html',
		controller: 'StoryCtrl'
	})

	$urlRouterProvider.otherwise('/story');
});