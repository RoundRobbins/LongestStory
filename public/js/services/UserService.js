angular.module('RoundRobin')
.factory('UserService', function($http, $q, $state){
	var baseUrl = "http://127.0.0.1:3000";
	var authenticated = false;
	var user = { nickname: "" };

	var o = {};

	o.signin = function(writer){

		$http.post('/user/signin', writer).then(function(response){
			$state.go('story');
			authenticated = true;
			user = response.data;
		}, function(err){
			console.log(err);
			authenticated = false;
		});
	}

	o.signout = function(){
		authenticated =  false;
		user = { nickname: "" };
	}

	o.isAuthenticated = function(){
		return authenticated;
	}

	o.getUser = function(){
		return user;
	}

	o.setNonce = function(nonce){
		user.nonce = nonce;
	}

	o.getNonce = function(){
		return user.nonce;
	}

	return o;
});