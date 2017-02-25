angular.module('RoundRobin')
.factory('UserService', function($http, $q, $state){
	var baseUrl = "http://127.0.0.1:3000";
	var authenticated = false;
	var user = {};

	var o = {};

	o.signin = function(user){

		var deferred = $q.defer();

		$http.post('/user/signin', user).then(function(response){
			$state.go('story');
			authenticated = true;
			user = response;
			deferred.resolve({ id: user._id, nickname: user.nickname });
		}, function(err){
			console.log(err);
			authenticated = false;
			deferred.reject({ status: "ERROR", msg: err });
		});

		return deferred.promise;
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