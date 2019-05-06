/* eslint-disable sort-keys */
/* eslint-disable consistent-return */
const HttpStatus = require('http-status-codes');
const Subject = require("../models/Subject");
const StatusText = require("./constants");

const { SUCCESS, FAIL, ERROR } = StatusText;
const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR, CREATED, NOT_FOUND } = HttpStatus;

// Create and Save a new Subject
exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(BAD_REQUEST)
                .send({
                    status: FAIL,
                    data: { name: "Subject name is required" },
                });
        }

        const subject = new Subject({
            description,
            name,
        });

        const data = await subject.save();

        res.status(CREATED)
            .send({
                status: SUCCESS,
                data: { subject: data },
            });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: ERROR,
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            });
    }

};

// Retrieve and return all subject from the database.
exports.findAll = async (req, res) => {
    try {
        const data = await Subject.find();

        res.status(OK)
            .send({
                status: SUCCESS,
                data: { subjects: data },
            });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: ERROR,
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            });
    }
};

// Find a single subject with a subjectId
exports.findOne = async (req, res) => {
    const { subjectId } = req.params;

    try {
        const data = await Subject.findById(subjectId);
        if (!data) {
            return res.status(NOT_FOUND)
                .send({
                    status: FAIL,
                    data: { id: `Subject not found with id ${subjectId}` },
                });
        }
        res.status(OK)
            .send({
                status: SUCCESS,
                data: { subject: data },
            });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(NOT_FOUND)
                .send({
                    status: FAIL,
                    data: { id: `Subject not found with id ${subjectId}` },
                });
        }
        return res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: ERROR,
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            });
    };
};

// Update a subject identified by the subjectId in the request
exports.update = async (req, res) => {
    const { name, description } = req.body;
    const { subjectId } = req.params;

    try {
        // Validate Request
        if (!name) {
            return res.status(BAD_REQUEST)
                .send({
                    status: FAIL,
                    data: { name: "Subject  name is empty" },
                });
        }

        // Find subject and update it with the request body
        const data = await Subject.findByIdAndUpdate(subjectId, {
            description,
            name,
        }, { new: true });

        if (!data) {
            return res.status(NOT_FOUND)
                .send({
                    status: FAIL,
                    data: { id: `Subject not found with id ${subjectId}` },
                });
        }
        res.status(OK)
            .send({
                status: SUCCESS,
                data: { subject: data },
            });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(NOT_FOUND)
                .send({
                    status: FAIL,
                    data: { id: `Subject not found with id ${subjectId}` },
                });
        }
        return res.status(INTERNAL_SERVER_ERROR)
            .send({
                status: ERROR,
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            });

    }

};

// Delete a subject with the specified subjectId in the request
exports.delete = async (req, res) => {
    const { subjectId } = req.params;

    try {
        const status = await Subject.findByIdAndRemove(subjectId);

        if (!status) {
            return res.status(NOT_FOUND)
                .send({
                    status: FAIL,
                    data: { id: `Subject not found with id ${subjectId}` },
                });
        }
        res.status(OK)
            .send({
                status: SUCCESS,
                data: null,
            });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(NOT_FOUND)
                .send({
                    status: FAIL,
                    data: { id: `Subject not found with id ${subjectId}` },
                });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};
