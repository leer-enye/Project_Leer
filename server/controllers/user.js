/* eslint-disable sort-keys */
/* eslint-disable consistent-return */
const HttpStatus = require('http-status-codes');
const User = require('../models/User');
const StatusText = require('./constants');

const { SUCCESS, FAIL, ERROR } = StatusText;
const {
    BAD_REQUEST,
    OK,
    INTERNAL_SERVER_ERROR,
    CREATED,
    NOT_FOUND,
} = HttpStatus;

// Create and Save a new User
exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(BAD_REQUEST).send({
                status: FAIL,
                data: { name: 'User name is required' },
            });
        }

        const user = new User({
            description,
            name,
        });

        const data = await user.save();

        res.status(CREATED).send({
            status: SUCCESS,
            data: { user: data },
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};

// Retrieve and return all user from the database.
exports.findAll = async (req, res) => {
    try {
        const subjects = await User.find();

        res.status(OK).send({
            status: SUCCESS,
            data: { subjects },
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};

// Find a single user with a subjectId
exports.findOne = async (req, res) => {
    const { subjectId } = req.params;

    try {
        const user = await User.findById(subjectId);
        if (!user) {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                data: { id: `User not found with id ${subjectId}` },
            });
        }
        res.status(OK).send({
            status: SUCCESS,
            data: { user },
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                data: { id: `User not found with id ${subjectId}` },
            });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};

// Update a user identified by the subjectId in the request
exports.update = async (req, res) => {
    const { name, description } = req.body;
    const { subjectId } = req.params;

    try {
        // Validate Request
        if (!name) {
            return res.status(BAD_REQUEST).send({
                status: FAIL,
                data: { name: 'User  name is empty' },
            });
        }

        // Find user and update it with the request body
        const user = await User.findByIdAndUpdate(
            subjectId,
            {
                description,
                name,
            },
            { new: true }
        );

        if (!user) {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                data: { id: `User not found with id ${subjectId}` },
            });
        }
        res.status(OK).send({
            status: SUCCESS,
            data: { user },
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                data: { id: `User not found with id ${subjectId}` },
            });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};

// Delete a user with the specified subjectId in the request
exports.delete = async (req, res) => {
    const { subjectId } = req.params;

    try {
        const status = await User.findByIdAndRemove(subjectId);

        if (!status) {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                data: { id: `User not found with id ${subjectId}` },
            });
        }
        res.status(OK).send({
            status: SUCCESS,
            data: null,
        });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                data: { id: `User not found with id ${subjectId}` },
            });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};
