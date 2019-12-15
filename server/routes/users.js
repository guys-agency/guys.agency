const routerUsers = require('express').Router();
const {
	findAllUsers,
	findUserById,
	findbyData,
} = require('../controllers/users');

routerUsers.get('/', findAllUsers);
routerUsers.get('/:id', findUserById);
routerUsers.get('/:key/:value', findbyData);

module.exports = routerUsers;
