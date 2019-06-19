const express = require('express');
const { subject } = require('../../controllers/');

const router = express.Router();

module.exports = app => {
    app.use('/api/subjects', router);
    router.post('/', subject.create);
    router.get('/', subject.findAll);
    router.get('/:subjectId', subject.findOne);
    router.put('/:subjectId', subject.update);
    router.delete('/:subjectId', subject.delete);
};
