'use strict';

const express = require('express');
const router = express.Router();
const auth = require('./src/app/utils/auth');

const controllerRegister = require('./src/app/controllers/register/controller.js');
const controllerLogin = require('./src/app/controllers/login/controller.js');

router.post('/', controllerLogin.login);
router.post('/register', controllerRegister.register);
router.post('/update-password', auth.validateToken, controllerLogin.updatePassword);
router.post('/forget-password', controllerLogin.forgetPassword);

module.exports = router;