/* eslint-disable sort-keys */
/* eslint-disable consistent-return */
const HttpStatus = require('http-status-codes');
const Content = require("../models/Content");

const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR, CREATED, NOT_FOUND } = HttpStatus;

// Create and Save a new Content
exports.create = async(req, res) => {
    try {
        const { title, resourceType, tags, url, subjectId } = req.body;
        // Validate request
        if (!title) {
            return res.status(BAD_REQUEST)
                .send({
                    status: "fail",
                    data: { "title": "Content title is required" },
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
        res.status(CREATED)
            .send({
                status: "success",
                data: { "content": data },
            });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: "error",
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR) ||
                    "Some error occurred while creating the Content.",
            });
    };
};

// Retrieve and return all content from the database.
exports.findAll = async(req, res) => {
    try {
        const data = await Content.find();
        res.status(OK)
            .send({
                status: "success",
                data: { "contents": data },
            });

    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: "error",
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR) ||
                    "Some error occurred while retrieving contents.",
            });
    };
};

// Find a single content with a contentId
exports.findOne = async(req, res) => {
    const { contentId } = req.params;
    try {
        const data = await Content.findById(contentId);
        if (!data) {
            return res.status(NOT_FOUND)
                .send({
                    status: "fail",
                    data: { "id": `Content not found with id ${contentId}` },
                });
        }
        res.status(OK)
            .send({
                status: "success",
                data: { "content": data },
            });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(NOT_FOUND)
                .send({
                    status: "fail",
                    data: { "id": `Content not found with id ${contentId}` },
                });
        }
        return res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: "error",
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR) ||
                    `Error retrieving content with id ${contentId}`,
            });
    };

};

// Update a content identified by the contentId in the request
exports.update = async(req, res) => {
    const { contentId } = req.params;
    const { title, resourceType, tags, url, subjectId } = req.body;
    try {

        // Validate Request
        if (!title) {
            return res.status(BAD_REQUEST)
                .send({
                    status: "fail",
                    data: { "title": "Content  title is empty" },
                });
        }

        // Find content and update it with the request body
        const data = await Content.findByIdAndUpdate(contentId, {
            title,
            resourceType,
            tags,
            url,
            subjectId,
        }, { new: true });
        if (!data) {
            return res.status(NOT_FOUND)
                .send({
                    status: 'fail',
                    data: { "id": `content not found with id ${contentId}` },
                });
        }
        res.status(OK)
            .send({
                status: "success",
                data: { "content": data },
            });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(NOT_FOUND)
                .send({
                    status: 'fail',
                    data: { "id": `content not found with id ${contentId}` },
                });
        }
        return res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: "error",
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR) ||
                    `Error updating content with id ${contentId}`,
            });
    };
};

// Delete a content with the specified contentId in the request
exports.delete = async(req, res) => {
    const { contentId } = req.params;
    try {
        const isDeleted = await Content.findByIdAndRemove(contentId);
        if (!isDeleted) {
            return res.status(NOT_FOUND)
                .send({
                    status: 'fail',
                    data: { "id": `Content not found with id ${contentId}` },
                });
        }
        res.status(OK)
            .send({
                status: "success",
                data: null,
            });

    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(NOT_FOUND)
                .send({
                    status: 'fail',
                    data: { "id": `Content not found with id ${contentId}` },
                });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR) ||
                `Could not delete content with id ${contentId}`,
        });
    };
};
