var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	nickname: String,
	isWriter: {
		type: Boolean,
		default: false
	},
	writerNonce: {
		type: String,
		default: null
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);