const express = require('express');

const router = express.Router();
const subjects = require('../routes/api/subject');
const contents = require('../routes/api/content');

subjects(router);
contents(router);

module.exports = router;
