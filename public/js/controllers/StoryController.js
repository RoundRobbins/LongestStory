angular.module('RoundRobin')
.controller('StoryCtrl', function($scope, StoryService, UserService){
	var socket = io.connect('http://127.0.0.1:3000/nest');

	$scope.user = UserService.getUser();
	$scope.writers = [];

	socket.on('SOCK_HELLO', function(data){
		console.log(data);
		StoryService.getWriters().then(function(result){
			console.log(result);
		}, function(error){
			console.log(error);
		})
	});

	socket.on('REFRESH_WRITERS', function(data){
		getWriters();
	})

	var getWriters = function(){
		StoryService.getWriters().then(function(result){
			$scope.writers = result.writers;
			console.log($scope.writers);
		}, function(err){
			console.log(err);
		})
	}

	$scope.signin = function(){
		console.log($scope.user.nickname);
		if($scope.user.nickname === ''){
			$("#nickname").addClass("invalid");
			$("#nickname").prop("aria-invalid", "true");
			return;
		}

		UserService.signin($scope.user);
	}

	$scope.write = function(){
		StoryService.writeRequest().then(function(result){
			UserService.setNonce(result.nonce);
		}, function(err){
			console.log(err);
		})
	}

	getWriters();
});