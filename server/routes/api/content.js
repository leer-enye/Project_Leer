const express = require('express');
const contents = require('../../controllers/content');

const router = express.Router();

module.exports = app => {
    app.use('/api/contents', router);
    router.post('/', contents.create);
    router.get('/', contents.findAll);
    router.get('/:contentId', contents.findOne);
    router.put('/:contentId', contents.update);
    router.delete('/:contentId', contents.delete);
};
