const express = require('express');
const { content } = require('../../controllers/');

const router = express.Router();

module.exports = app => {
    app.use('/api/contents', router);
    router.post('/', content.create);
    router.get('/', content.findAll);
    router.get('/:contentId', content.findOne);
    router.put('/:contentId', content.update);
    router.delete('/:contentId', content.delete);
};
