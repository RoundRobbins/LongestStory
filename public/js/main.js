var app = angular.module('RoundRobin', ['ui.router', 'auth0.auth0', 'angular-jwt'])

app.config(function($stateProvider, $urlRouterProvider, angularAuth0Provider){
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

	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '../templates/signup.html',
		controller: 'StoryCtrl'
	})

	$urlRouterProvider.otherwise('/signin');
	angularAuth0Provider.init({
	  clientID: 'A02UxmKAHdGacjvm4S777a443cQOgjuD',
	  domain: 'malithsen.auth0.com'
	});
});

app.run(function($rootScope, UserService) {

  angular.element(document).ready(function () {
		var scene = document.getElementById('scene');
	  var parallax = new Parallax(scene);
  });

  $rootScope.UserService = UserService;
  UserService.checkAuthOnRefresh();
});