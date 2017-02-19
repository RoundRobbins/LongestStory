var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	nickname: String,
	isWriter: {
		type: Boolean,
		default: false
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);