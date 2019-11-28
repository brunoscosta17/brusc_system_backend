"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json(
    { limit: '5mb' }
));

const routes = require('../../routes');

app.use('/', routes);

module.exports = app;