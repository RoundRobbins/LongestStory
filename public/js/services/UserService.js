angular.module('RoundRobin')
.factory('UserService', function($http, $q, $state, authManager, angularAuth0, jwtHelper, $location){
	var baseUrl = "http://127.0.0.1:3000";
	var authenticated = false;
	var user = { nickname: "" };

	var o = {};

	function onAuthenticated(error, authResult) {
    if (error) {
      console.log("login failed");
    }

    localStorage.setItem('id_token', authResult.idToken);
    authManager.authenticate();

    angularAuth0.getProfile(authResult.idToken, function (error, profileData) {
      if (error) {
        return console.log(error);
      }

      localStorage.setItem('profile', JSON.stringify(profileData));
      userProfile = profileData;

      $location.path('/story');
    });
  }

	o.signin = function(){
		angularAuth0.login({
      connection: 'google-oauth2',
      responseType: 'token',
      popup: true
    }, onAuthenticated);
	}

	o.signout = function(){
		localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
		user = { nickname: "" };
    authManager.unauthenticate();
	}

  o.checkAuthOnRefresh = function() {
    var token = localStorage.getItem('id_token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        authManager.authenticate();
      }
    } else {
      $location.path('/signin');
    }
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

	return o;
});