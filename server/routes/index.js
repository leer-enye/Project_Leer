const express = require('express');
const routes = require('./api');

const router = express.Router();

routes.forEach(item => item(router));

module.exports = router;
