const express = require('express');
const subjects = require('../routes/api/subject');
const contents = require('../routes/api/content');

const router = express.Router();

subjects(router);
contents(router);

module.exports = router;
