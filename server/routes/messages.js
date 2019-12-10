const routerMessages = require('express').Router();
const {
	getMessages,
	createMessage,
	deleteMessage,
} = require('../controllers/messages');

routerMessages.get('/', getMessages);
routerMessages.post('/', createMessage);
routerMessages.delete('/:MessageId', deleteMessage);

module.exports = routerMessages;
