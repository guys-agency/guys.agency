const mongoose = require('mongoose');
const validator = require('mongoose-validator');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 30,
	},
	about: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
		validate: validator({
			validator: 'isURL',
			message: 'Введена не ссылка',
		}),
	},
	regalias: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: false,
	},
	avataL: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('user', userSchema);
