/* eslint-disable consistent-return */
const Subject = require("../models/Subject");

// Create and Save a new Subject
exports.create = (req, res) => {

    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Subject content can not be empty",
        });
    }

    // Create a Subject
    const subject = new Subject({
        description: req.body.description,
        name: req.body.name || "Undefined Subject",
    });

    // Save Subject in the database
    subject.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Subject.",
            });
        });
};

// Retrieve and return all subject from the database.
exports.findAll = (req, res) => {
    Subject.find()
        .then(subjects => {
            res.send(subjects);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving subjects.",
            });
        });
};

// Find a single subject with a subjectId
exports.findOne = (req, res) => {
    Subject.findById(req.params.subjectId)
        .then(subject => {
            if (!subject) {
                return res.status(404).send({
                    message: `Subject not found with id ${req.params.subjectId}`,
                });
            }
            res.send(subject);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Subject not found with id ${req.params.subjectId}`,
                });
            }
            return res.status(500).send({
                message: `Error retrieving subject with id ${req.params.subjectId}`,
            });
        });
};

// Update a subject identified by the subjectId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Subject content can not be empty",
        });
    }

    // Find subject and update it with the request body
    Subject.findByIdAndUpdate(req.params.subjectId, {
            description: req.body.description,
            name: req.body.name || "Undefined Subject",
        }, { new: true })
        .then(subject => {
            if (!subject) {
                return res.status(404).send({
                    message: `Subject not found with id ${req.params.subjectId}`,
                });
            }
            res.send(subject);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Subject not found with id ${req.params.subjectId}`,
                });
            }
            return res.status(500).send({
                message: `Error updating subject with id ${req.params.subjectId}`,
            });
        });
};

// Delete a subject with the specified subjectId in the request
exports.delete = (req, res) => {

    Subject.findByIdAndRemove(req.params.subjectId)
        .then(subject => {
            if (!subject) {
                return res.status(404).send({
                    message: `Subject not found with id ${req.params.subjectId}`,
                });
            }
            res.send({ message: "Subject deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: `Subject not found with id ${req.params.subjectId}`,
                });
            }
            return res.status(500).send({
                message: `Could not delete subject with id ${req.params.subjectId}`,
            });
        });

};