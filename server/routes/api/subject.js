const express = require('express');
const subjects = require('../../controllers/subject');

const router = express.Router();

module.exports = app => {
    app.use('/api/subjects', router);
    router.post('/', subjects.create);
    router.get('/', subjects.findAll);
    router.get('/:subjectId', subjects.findOne);
    router.put('/:subjectId', subjects.update);
    router.delete('/:subjectId', subjects.delete);

};
