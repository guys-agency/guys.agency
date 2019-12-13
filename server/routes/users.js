const routerUsers = require('express').Router();
const {
	findAllUsers,
	findUserById,
	findbyName,
} = require('../controllers/users');

routerUsers.get('/', findAllUsers);
routerUsers.get('/:id', findUserById);
routerUsers.get('/name/:search', findbyName);

module.exports = routerUsers;
