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
    UNAUTHORIZED,
} = HttpStatus;

// Create and Save a new User
exports.create = async (req, res) => {
    try {
        const {
            accessToken,
            email,
            name,
            picture,
            providerId,
            providerName,
        } = req.body;

        if (!email || !name) {
            return res.status(BAD_REQUEST).send({
                status: FAIL,
                message: HttpStatus.getStatusText(BAD_REQUEST),
            });
        }

        const newUser = new User({
            accessToken,
            email,
            name,
            picture,
            providerId,
            providerName,
        });

        const user = await newUser.save();

        res.status(CREATED).send({
            status: SUCCESS,
            data: { user },
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
        const users = await User.find();

        res.status(OK).send({
            status: SUCCESS,
            data: { users },
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
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                message: HttpStatus.getStatusText(NOT_FOUND),
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
                message: HttpStatus.getStatusText(NOT_FOUND),
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
    try {
        const isAuthenticated = await req.isAuthenticated();

        if (!isAuthenticated) {
            res.status(UNAUTHORIZED).send({
                status: FAIL,
                message: HttpStatus.getStatusText(UNAUTHORIZED),
            });
        }

        const { userId } = req.params;
        const newUser = {};
        const entries = Object.entries(req.body);

        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of entries) {
            if (value) {
                newUser[key] = value;
            }
        }

        if (!newUser) {
            return res.status(BAD_REQUEST).send({
                status: FAIL,
                message: HttpStatus.getStatusText(BAD_REQUEST),
            });
        }

        // Find user and update it with the request body
        const user = await User.findByIdAndUpdate(userId, newUser, {
            new: true,
        });

        if (!user) {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                message: HttpStatus.getStatusText(NOT_FOUND),
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
                message: HttpStatus.getStatusText(NOT_FOUND),
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
    const { userId } = req.params;

    try {
        const status = await User.findByIdAndRemove(userId);

        if (!status) {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                message: HttpStatus.getStatusText(NOT_FOUND),
            });
        }

        res.status(OK).send({
            status: SUCCESS,
        });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                message: HttpStatus.getStatusText(NOT_FOUND),
            });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};
