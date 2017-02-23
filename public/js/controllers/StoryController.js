angular.module('RoundRobin')
.controller('StoryCtrl', function($scope, StoryService){
	socket = io.connect('http://127.0.0.1:3000/nest');

	socket.on('SOCK_HELLO', function(data){
		console.log(data);
		StoryService.getWriters().then(function(result){
			console.log(result);
		}, function(error){
			console.log(error);
		})
	});
});