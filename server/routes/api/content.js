const express = require('express');
const { Content } = require('../../controllers/');

const router = express.Router();

module.exports = app => {
    app.use('/api/contents', router);
    router.post('/', Content.create);
    router.get('/', Content.findAll);
    router.get('/:contentId', Content.findOne);
    router.put('/:contentId', Content.update);
    router.delete('/:contentId', Content.delete);
};
