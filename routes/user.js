var express = require('express');
var router = express.Router();
const userFunction = require('../controller/user');

router.post('/', userFunction.addUser);

router.put('/:id', userFunction.replaceData);

router.get('/', userFunction.showUser);

router.get('/:id', userFunction.showUserByID);

router.delete('/:id', userFunction.deleteUser);

module.exports = router;
