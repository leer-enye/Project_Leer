const express = require('express');
const { Subject } = require('../../controllers/');

const router = express.Router();

module.exports = app => {
    app.use('/api/subjects', router);
    router.post('/', Subject.create);
    router.get('/', Subject.findAll);
    router.get('/:subjectId', Subject.findOne);
    router.put('/:subjectId', Subject.update);
    router.delete('/:subjectId', Subject.delete);
};
