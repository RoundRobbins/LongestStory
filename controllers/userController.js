var mongoose = require('mongoose');
var User = require('../models/user');
var express = require('express');
var router = express.Router();

router.post('/signin', function(req, res){
	User.findOneAndUpdate({ nickname: req.body.nickname }, {}, { new: true, upsert: true}, function(err, user){
		if(err){
			res.json({ status: "ERROR", msg: err });
			return;
		}
		res.json(user);
	});
});

module.exports = router;