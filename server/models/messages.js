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
	type: {
		type: String,
		required: true,
		enum: ['message', 'image', 'stickers'],
	},
	cat: {
		type: String,
		required: false,
		enum: ['brand', 'uxui', 'develop', 'research'],
	},
	text: {
		type: String,
		required: true,
	},
	imgRef: {
		type: String,
		required: false,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
});

module.exports = mongoose.model('message', cardSchema);
