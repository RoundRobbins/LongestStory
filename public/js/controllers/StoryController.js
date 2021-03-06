angular.module('RoundRobin')
.controller('StoryCtrl', function($scope, $state, StoryService, UserService){
	var socket = io.connect('http://localhost:3000/nest');
	var scene = document.getElementById('scene');
	var parallax = new Parallax(scene);

	$scope.user = UserService.getUser();
	$scope.writers = [];
	$scope.snippets = [];

	$scope.isWriter = false;
	$scope.snippet = {
		author: {
			id: $scope.user._id,
			nickname: $scope.user.nickname
		},
		content: ""
	};

	$scope.voteSnippet = "";

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
	});

	socket.on('USER_DETACH', function(data){
		console.log(data);
		var user = UserService.getUser();
		if(data.nonce === user.nonce){
			$('#write-pad').modal('close');
		}
	});

	socket.on('USER_SWITCH', function(data){
		var user = UserService.getUser();
		console.log(data);

		if(data.nonce === user.nonce){
			isWriter = true;
			$('#write-pad').modal('open');
			console.log(isWriter);
		}
		else{
			isWriter = false;
		}
	});

	socket.on('REFRESH_STORY', function(data){
		$("#vote-pad").modal('close');
		getSnippets();
	});

	socket.on('VOTE_SNIPPET', function(data){
		console.log(data);
		var user = UserService.getUser();

		if(user.nonce != data.nonce){
			$scope.$apply(function(){
				$scope.voteSnippet = data.snippet;
			})
			$("#vote-pad").modal('open');
		}

	})

	var getWriters = function(){
		StoryService.getWriters().then(function(result){
			$scope.writers = result.writers;
			console.log($scope.writers);
		}, function(err){
			console.log(err);
		})
	}

	var getSnippets = function(){
		StoryService.getStorySnippets().then(function(result){
			$scope.snippets = result;
		}, function(err){
			console.log(err);
		});
	}

	var initialize = function(){
		$('.modal').modal({
			opacity: 0.8,
			ready: function(modal, trigger){
				console.log("Ready");
			}
		});

		getWriters();
		getSnippets();
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

	$scope.signup = function(){
		$state.go('signup');
	}


	$scope.write = function(){
		StoryService.writeRequest().then(function(result){
			UserService.setNonce(result.nonce);
		}, function(err){
			console.log(err);
		})
	}

	$scope.submit = function(){
		console.log($scope.snippet);
		StoryService.submitSnippet($scope.snippet).then(function(result){
			console.log(result);
			$('#write-pad').modal('close');
		}, function(err){
			console.log(err);
		})
	}

	$scope.vote = function(vote){
		StoryService.voteSnippet(vote).then(function(result){
			$('#vote-pad').modal('close');
			console.log("vote submitted");
		}, function(err){
			console.log(err);
		})
	}

	initialize();
});