const express = require('express');
const { question } = require('../../controllers/');

const router = express.Router();

module.exports = app => {
    app.use('/api/questions', router);
    router.post('/', question.create);
    router.get('/', question.findRandom);
    router.get('/:questionId', question.findOne);
    router.put('/:questionId', question.update);
    router.delete('/:questionId', question.delete);
};
