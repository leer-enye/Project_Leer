const mongoose = require('mongoose');

const { Schema } = mongoose;

// create schema
const SubjectSchema = new Schema({
    description: {
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
}, { timestamps: true });
const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;
