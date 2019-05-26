const express = require('express');
const subjects = require('../routes/api/subject');
const contents = require('../routes/api/content');
const users = require('../routes/api/user');

const router = express.Router();

users(router);
subjects(router);
contents(router);

module.exports = router;
