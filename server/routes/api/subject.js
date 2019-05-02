const express = require('express');

const router = express.Router();
const subjects = require('../../controllers/subject');

// eslint-disable-next-line func-names
module.exports = function(app) {
    app.use('/api/subjects', router);
    // Create a new Note
    router.post('/', subjects.create);

    // Retrieve all Notes
    router.get('/', subjects.findAll);

    // Retrieve a single Note with subjectId
    router.get('/:subjectId', subjects.findOne);

    // Update a Note with subjectId
    router.put('/:subjectId', subjects.update);

    // Delete a Note with subjectId
    router.delete('/:subjectId', subjects.delete);

};
