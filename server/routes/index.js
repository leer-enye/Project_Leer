const express = require('express');
const contents = require('./api/content');
const questions = require('./api/question');
const subjects = require('./api/subject');
const users = require('./api/user');

const router = express.Router();

users(router);
subjects(router);
contents(router);
questions(router);

module.exports = router;
