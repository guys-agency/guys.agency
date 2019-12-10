const mongoose = require('mongoose');
const validator = require('mongoose-validator');

const cardSchema = new mongoose.Schema({
	block: {
		type: String,
		required: true,
		enum: ['start', 'about', 'works', 'contacts'],
	},
	index: {
		type: Number,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
});

module.exports = mongoose.model('message', cardSchema);
