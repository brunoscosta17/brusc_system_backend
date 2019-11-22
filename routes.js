'use strict';

const express = require('express');
const router = express.Router();

const controllerRegister = require('./src/app/controllers/register/controller.js');
const controllerLogin = require('./src/app/controllers/login/controller.js');

router.post('/register', controllerRegister.register);
router.post('/login', controllerLogin.login);
router.post('/reset-password', controllerLogin.resetPassword);

module.exports = router;