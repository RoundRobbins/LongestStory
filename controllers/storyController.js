var mongoose = require('mongoose');
var express = require('express');
var Story = require('../models/story');
var User = require('../models/user');

var storyController = function(io)
{
	var router = express.Router();

	var snippet = {
		content: null,
		votes: {
			up: 0,
			down: 0
		}
	};

	var currUser = "";
	var inVoting = false;
	var timeOut = -1;

	io.on('connection', function(socket){
		console.log('Robin in the nest...');
		socket.emit('SOCK_HELLO', 'Connected to nest...');
	});

	var triggerRotation = function(){
		if(inVoting) return;

		var getNextUser = function(){
			currUser = "";
			var q = User.find({ isWriter: true }).sort({ timestamp: -1 }).limit(1);
			q.exec(function(err, result){
				if(err) throw err;

				if(result.length == 0){
					return;
				}

				currUser = result[0]._id;

				io.emit('USER_SWITCH', { writer: result[0].nickname })
				console.log(currUser);
			});
		}

		if(currUser != undefined && currUser != ""){
			console.log("Detaching current user");
			User.findOneAndUpdate({ _id: currUser }, { isWriter: false }, function(err, result){
				if(err){
					console.log(err);
					return;
				}
				getNextUser();
			});
		}
		else{
			getNextUser();
		}

		timeOut = setTimeout(function(){
			triggerRotation();
		}, 10000);
	}

	router.post('/:title', function(req, res){
		var title = req.params.title;
		var admin = req.body.admin;

		Story.findOneAndUpdate({ title: title }, { admin: admin, title: title }, { upsert: true }, function(err, result){
			if(err){
				res.json({ status: "ERROR", msg: err });
			}

			res.json(result);
		})
	});

	router.post('/:id/append', function(req, res){
		var id = req.params.id;
		snippet.content = req.body.snippet;
		var inVoting = true;
		console.log("CurrUser: " + currUser);
		console.log("Snippet author: " + snippet.content.author);


		if(snippet.content.author!== currUser.toString()){
			res.json({ status: "ERROR", msg: "Unauthorized" });
			return;
		}

		clearTimeout(timeOut);

		setTimeout(function(){
			//include some vote logic here
			Story.findOneAndUpdate({ _id: id }, { $push: { sections: snippet.content} }, function(err, result){
				if(err){
					console.log("Couldn't append the story...");
					return;
				}
				snippet.votes = { up: 0, down: 0};
				inVoting = false;
				console.log(result);
				triggerRotation();
			})
		}, 30000)
		res.json({ status: "SUCCESS" });
	});

	router.post('/:id/vote', function(req, res){
		var vote = req.body.vote;
		var id = req.params.id;

		if(!inVoting){
			res.json({ status: "ERROR", "msg": "No new snippet" });
			return;
		}

		if(snippet == undefined || snippet.id === id){
			res.json({ status: "ERROR", msg: "Could not register vote"});
			return;
		}

		if(vote === "U"){
			snippet.votes.up += 1;
		}
		else if(vote === "D"){
			snipper.votes.down -= 1;
		}
	});

	router.post('/:id/write', function(req, res){
		var id = req.params.id;
		User.findOneAndUpdate({ _id: id }, { isWriter: true }, function(err, result){
			if(err){
				res.json({ status: "ERROR", msg: err });
				return;
			}
			res.json(result);
		});
	});

	triggerRotation();
	return router;
}

module.exports = storyController;