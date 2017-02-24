angular.module('RoundRobin')
.factory('UserService', function($http, $q, $state){
	var baseUrl = "http://127.0.0.1:3000";
	var authenticated = false;
	var user = { id: "", nonce: ""};

	var o = {};

	o.signin = function(user){

		$http.post('/user/signin', user.nickname).then(function(response){
			$state.go('story');
			authenticated = true;
			user.id = response.data[0]._id;
		}, function(err){
			console.log(err);
			authenticated = false;
		});
	}

	o.signout = function(){
		authenticated =  false;
		user.id = "";
	}

	o.isAuthenticated = function(){
		return authenticated;
	}

	o.getUserId = function(){
		return user.id;
	}

	o.setNonce = function(nonce){
		user.nonce = nonce;
	}

	o.getNonce = function(){
		return user.nonce;
	}

	return o;
});