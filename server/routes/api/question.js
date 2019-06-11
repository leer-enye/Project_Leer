const express = require('express');
const questions = require('../../controllers/question');

const router = express.Router();

module.exports = app => {
    app.use('/api/questions', router);
    router.post('/', questions.create);
    router.get('/', questions.findAll);
    router.get('/:questionId', questions.findOne);
    router.put('/:questionId', questions.update);
    router.delete('/:questionId', questions.delete);
};
