/* eslint-disable sort-keys */
/* eslint-disable consistent-return */
const Content = require("../models/Content");

// Create and Save a new Content
exports.create = async(req, res) => {

    try {
        const { title, resourceType, tags, url, subjectId } = req.body;
        // Validate request
        if (!title) {
            return res.status(400).send({
                message: "Content can not be empty",
            });
        }

        // Create a Content
        const content = new Content({
            title,
            resourceType,
            tags,
            url,
            subjectId,
        });

        // Save Content in the database
        const data = await content.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Content.",
        });
    };
};

// Retrieve and return all content from the database.
exports.findAll = async(req, res) => {
    try {
        const data = await Content.find();
        res.send(data);

    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contents.",
        });
    };
};

// Find a single content with a contentId
exports.findOne = async(req, res) => {

    try {
        const { contentId } = req.params;
        const data = await Content.findById(contentId);
        if (!data) {
            return res.status(404).send({
                message: `Content not found with id ${contentId}`,
            });
        }
        res.send(data);
    } catch (err) {
        const { contentId } = req.params;
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Content not found with id ${contentId}`,
            });
        }
        return res.status(500).send({
            message: `Error retrieving content with id ${contentId}`,
        });
    };

};

// Update a content identified by the contentId in the request
exports.update = async(req, res) => {

    try {
        const { contentId } = req.params;
        // Validate Request
        if (!req.body.content) {
            return res.status(400).send({
                message: "Content content can not be empty",
            });
        }

        // Find content and update it with the request body
        const data = await Content.findByIdAndUpdate(contentId, {
            title: req.body.title,
            resourceType: req.body.resourceType,
            tags: req.body.tags,
            url: req.body.url,
            subjectId: req.body.subjectId,
        }, { new: true });
        if (!data) {
            return res.status(404).send({
                message: `Content not found with id ${contentId}`,
            });
        }
        res.send(data);
    } catch (err) {
        const { contentId } = req.params;
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Content not found with id ${contentId}`,
            });
        }
        return res.status(500).send({
            message: `Error updating content with id ${contentId}`,
        });
    };
};

// Delete a content with the specified contentId in the request
exports.delete = async(req, res) => {

    try {
        const { contentId } = req.params;
        const isDeleted = await Content.findByIdAndRemove(contentId);

        if (!isDeleted) {
            return res.status(404).send({
                message: `Content not found with id ${contentId}`,
            });
        }
        res.send({ message: "Content deleted successfully!" });

    } catch (err) {
        const { contentId } = req.params;
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: `Content not found with id ${contentId}`,
            });
        }
        return res.status(500).send({
            message: `Could not delete content with id ${contentId}`,
        });
    };
};
