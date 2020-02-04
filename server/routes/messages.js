const routerMessages = require('express').Router();
const {
  getMessages,
  findByWorksByCat,
  createMessage,
  deleteMessage,
} = require('../controllers/messages');

routerMessages.get('/', getMessages);
routerMessages.get('/:cat', findByWorksByCat);
routerMessages.post('/', createMessage);
routerMessages.delete('/:MessageId', deleteMessage);

module.exports = routerMessages;
