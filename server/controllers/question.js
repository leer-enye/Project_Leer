/* eslint-disable sort-keys */
/* eslint-disable consistent-return */
const { Types } = require('mongoose');
const HttpStatus = require('http-status-codes');
const { Question } = require('../models/');
const { StatusText } = require('./constants');

const { SUCCESS, FAIL, ERROR } = StatusText;
const {
    BAD_REQUEST,
    OK,
    INTERNAL_SERVER_ERROR,
    CREATED,
    NOT_FOUND,
} = HttpStatus;

// Create and Save a new Question
exports.create = async (req, res) => {
    try {
        const { text, options, tags, answer, subjectId } = req.body;

        // Validate request
        if (!text) {
            return res.status(BAD_REQUEST).send({
                status: FAIL,
                data: { text: 'Question text is required' },
            });
        }

        // Create a Question
        const question = new Question({
            text,
            options,
            tags,
            answer,
            subjectId,
        });

        // Save Question in the database
        const data = await question.save();

        res.status(CREATED).send({
            status: SUCCESS,
            data: { question: data },
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};

// Retrieve and return all question from the database.
exports.findAll = async (req, res) => {
    try {
        const questions = await Question.find();

        res.status(OK).send({
            status: SUCCESS,
            data: { questions },
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};

// Find a single question with a questionId
exports.findOne = async (req, res) => {
    const { questionId } = req.params;

    try {
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                data: { id: `Question not found with id ${questionId}` },
            });
        }
        res.status(OK).send({
            status: SUCCESS,
            data: { question },
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                data: { id: `Question not found with id ${questionId}` },
            });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};

// Update a question identified by the questionId in the request
exports.update = async (req, res) => {
    const { questionId } = req.params;
    const { text, options, tags, answer, subjectId } = req.body;

    try {
        // Validate Request
        if (!text) {
            return res.status(BAD_REQUEST).send({
                status: FAIL,
                data: { title: 'Question  title is empty' },
            });
        }

        // Find question and update it with the request body
        const question = await Question.findByIdAndUpdate(
            questionId,
            {
                text,
                options,
                tags,
                answer,
                subjectId,
            },
            { new: true }
        );

        if (!question) {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                data: { id: `question not found with id ${questionId}` },
            });
        }

        res.status(OK).send({
            status: SUCCESS,
            data: { question },
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                data: { id: `question not found with id ${questionId}` },
            });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};

// Delete a question with the specified questionId in the request
exports.delete = async (req, res) => {
    const { questionId } = req.params;

    try {
        const isDeleted = await Question.findByIdAndRemove(questionId);

        if (!isDeleted) {
            return res.status(NOT_FOUND).send({
                status: FAIL,
                data: { id: `Question not found with id ${questionId}` },
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
                data: { id: `Question not found with id ${questionId}` },
            });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};

// Retrieve and return all question from the database.
exports.findRandom = async (req, res) => {
    try {
        const { limit, subjectId } = req.params;
        const { ObjectId } = Types;
        const options = [];

        if (subjectId) {
            const subjectMathCondition = {
                $match: {
                    subjectId: new ObjectId(subjectId),
                },
            };
            options.push(subjectMathCondition);
        }

        const randomSamplingSize = {
            $sample: {
                size: limit || 10,
            },
        };
        options.push(randomSamplingSize);
        const questions = await Question.aggregate(options);

        res.status(OK).send({
            status: SUCCESS,
            data: { questions },
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({
            status: ERROR,
            message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
        });
    }
};
