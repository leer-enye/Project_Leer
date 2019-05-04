/* eslint-disable sort-keys */
/* eslint-disable consistent-return */
const HttpStatus = require('http-status-codes');
const Subject = require("../models/Subject");

const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR, CREATED, NOT_FOUND } = HttpStatus;

// Create and Save a new Subject
exports.create = async(req, res) => {
    try {

        const { name, description } = req.body;
        // Validate request
        if (!name) {
            return res.status(BAD_REQUEST)
                .send({
                    status: "fail",
                    data: { "name": "Subject name is required" },
                });
        }

        // Create a Subject
        const subject = new Subject({
            description,
            name: name || "Undefined Subject",
        });

        // Save Subject in the database
        const data = await subject.save();
        res.status(CREATED)
            .send({
                status: "success",
                data: { "subject": data },
            });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: "error",
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR) ||
                    "Some error occurred while creating the Subject.",
            });
    }

};

// Retrieve and return all subject from the database.
exports.findAll = async(req, res) => {
    try {
        const data = await Subject.find();
        res.status(OK)
            .send({
                status: "success",
                data: { "subjects": data },
            });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: "error",
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR) ||
                    "Some error occurred while retrieving subjects.",
            });
    }
};

// Find a single subject with a subjectId
exports.findOne = async(req, res) => {

    const { subjectId } = req.params;

    try {
        const data = await Subject.findById(subjectId);
        if (!data) {
            return res.status(NOT_FOUND)
                .send({
                    status: "fail",
                    data: { "id": `Subject not found with id ${subjectId}` },
                });
        }
        res.status(OK)
            .send({
                status: "success",
                data: { "subject": data },
            });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(NOT_FOUND)
                .send({
                    status: "fail",
                    data: { "id": `Subject not found with id ${subjectId}` },
                });
        }
        return res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: "error",
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR) ||
                    `Error retrieving subject with id ${subjectId}`,
            });
    };
};

// Update a subject identified by the subjectId in the request
exports.update = async(req, res) => {
    const { name, description } = req.body;
    const { subjectId } = req.params;
    try {
        // Validate Request
        if (!name) {
            return res.status(BAD_REQUEST)
                .send({
                    status: "fail",
                    data: { "name": "Subject  name is empty" },
                });
        }

        // Find subject and update it with the request body
        const data = await Subject.findByIdAndUpdate(subjectId, {
            description,
            name: name || "Undefined Subject",
        }, { new: true });

        if (!data) {
            return res.status(NOT_FOUND)
                .send({
                    status: 'fail',
                    data: { "id": `Subject not found with id ${subjectId}` },
                });
        }
        res.status(OK)
            .send({
                status: "success",
                data: { "subject": data },
            });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(NOT_FOUND)
                .send({
                    status: 'fail',
                    data: { "id": `Subject not found with id ${subjectId}` },
                });
        }
        return res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: "error",
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR) ||
                    `Error updating subject with id ${subjectId}`,
            });

    }

};

// Delete a subject with the specified subjectId in the request
exports.delete = async(req, res) => {
    const { subjectId } = req.params;
    try {
        const status = await Subject.findByIdAndRemove(subjectId);
        if (!status) {
            return res.status(NOT_FOUND)
                .send({
                    status: 'fail',
                    data: { "id": `Subject not found with id ${subjectId}` },
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
                    data: { "id": `Subject not found with id ${subjectId}` },
                });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({
            status: "error",
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR) ||
                `Could not delete subject with id ${req.params.subjectId}`,
        });
    }
};