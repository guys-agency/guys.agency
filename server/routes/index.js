const router = require('express').Router();
const routerUsers = require('./users');
const routerMessages = require('./messages');

router.use('/users', routerUsers);
router.use('/messages', routerMessages);

module.exports = router;
