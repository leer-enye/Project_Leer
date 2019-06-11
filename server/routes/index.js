const express = require('express');
const contents = require('../routes/api/content');
const questions = require('../routes/api/question');
const subjects = require('../routes/api/subject');
const users = require('../routes/api/user');

const router = express.Router();

users(router);
subjects(router);
contents(router);
questions(router);

module.exports = router;
