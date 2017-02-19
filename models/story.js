var mongoose = require('mongoose');

var storySchema = new mongoose.Schema({
	title: String,
	admin: String,
	sections:[{
		content: String,
		author: String,
		timestamp: {
			type: Date,
			default: Date.now
		}
	}]
});

module.exports = mongoose.model('Story', storySchema);