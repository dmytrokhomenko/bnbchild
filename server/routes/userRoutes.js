const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')

router.post('/auth', UserController.auth);

router.post('/register', UserController.register);

module.exports = router;