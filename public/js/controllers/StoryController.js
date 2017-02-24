angular.module('RoundRobin')
.controller('StoryCtrl', function($scope, StoryService, UserService){
	var socket = io.connect('http://127.0.0.1:3000/nest');

	var user = { nickname: '' };

	socket.on('SOCK_HELLO', function(data){
		console.log(data);
		StoryService.getWriters().then(function(result){
			console.log(result);
		}, function(error){
			console.log(error);
		})
	});

	var signin = function(){
		UserService.signin(user);
	}

	var write = function(){
		StoryService.writeRequest().then(function(result){
			console.log(result);
			UserService.setNonce(result.nonce);
		}, function(err){
			console.log(err);
		})
	}
});