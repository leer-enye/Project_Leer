const express = require('express');
const { Question } = require('../../controllers/');

const router = express.Router();

module.exports = app => {
    app.use('/api/questions', router);
    router.post('/', Question.create);
    router.get('/', Question.findRandom);
    router.get('/:questionId', Question.findOne);
    router.put('/:questionId', Question.update);
    router.delete('/:questionId', Question.delete);
};
