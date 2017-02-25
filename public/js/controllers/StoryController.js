angular.module('RoundRobin')
.controller('StoryCtrl', function($scope, StoryService, UserService){
	var socket = io.connect('http://127.0.0.1:3000/nest');

	$scope.user = { nickname: "" };

	socket.on('SOCK_HELLO', function(data){
		console.log(data);
		StoryService.getWriters().then(function(result){
			console.log(result);
		}, function(error){
			console.log(error);
		})
	});

	$scope.signin = function(){
		console.log($scope.user.nickname);
		if($scope.user.nickname === ''){
			$("#nickname").addClass("invalid");
			$("#nickname").prop("aria-invalid", "true");
			return;
		}

		UserService.signin($scope.user).then(function(result){
			console.log(result);
			$scope.user = result;
		}, function(err){
			console.log(err);
		});
	}

	$scope.write = function(){
		StoryService.writeRequest().then(function(result){
			console.log(result);
			UserService.setNonce(result.nonce);
		}, function(err){
			console.log(err);
		})
	}
});