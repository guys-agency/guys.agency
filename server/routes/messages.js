const routerMessages = require('express').Router();
const {
	getMessages,
	findByBlock,
	createMessage,
	deleteMessage,
} = require('../controllers/messages');

routerMessages.get('/', getMessages);
routerMessages.get('/:block', findByBlock);
routerMessages.post('/', createMessage);
routerMessages.delete('/:MessageId', deleteMessage);

module.exports = routerMessages;
