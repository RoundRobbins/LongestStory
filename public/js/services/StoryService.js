angular.module('RoundRobin')
.factory('StoryService', function($q, $http, UserService){
	var o = {};

	var baseUrl = "http://127.0.0.1:3000";

	o.getWriters = function(){
		var deferred = $q.defer();

		$http.get(baseUrl + '/story/writers').then(function(response){
			deferred.resolve({ status: "SUCCESS", writers: response.data });
		}, function(error){
			deferred.reject({ status: "ERROR", msg: error });
		});

		return deferred.promise;
	}

	o.writeRequest = function(){
		var deferred = $q.defer();
		var user = UserService.getUser();

		$http.post(baseUrl + '/story/' + user._id + '/write').then(function(response){
			deferred.resolve(response.data);
		}, function(err){
			deferred.reject({ status: "ERROR", msg: err });
		});

		return deferred.promise;
	}

	o.getStorySnippets = function(id){
		var deferred = $q.defer();

		$http.get(baseUrl + '/story/58df1784e599f58a50729b7d/snippets').then(function(response){
			deferred.resolve(response.data);
		}, function(err){
			deferred.reject({ status: "ERROR", msg: err });
		});

		return deferred.promise;
	}

	o.submitSnippet = function(snippet){
		var deferred = $q.defer();
		$http.post(baseUrl + '/story/58df1784e599f58a50729b7d/append', snippet).then(function(response){
			deferred.resolve(response.data);
		}, function(err){
			deferred.reject({ status: "ERROR", msg: err });
		});

		return deferred.promise;
	}

	return o;
});