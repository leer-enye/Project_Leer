const express = require('express');

const router = express.Router();

const contents = require('../../controllers/content');

// Create a new Note
router.post('/', contents.create);

// Retrieve all Notes
router.get('/', contents.findAll);

// Retrieve a single Note with contentId
router.get('/:contentId', contents.findOne);

// Update a Note with contentId
router.put('/:contentId', contents.update);

// Delete a Note with contentId
router.delete('/:contentId', contents.delete);

module.exports = router;