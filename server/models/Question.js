/* eslint-disable sort-keys */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuestionSchema = new Schema(
    {
        text: String,
        options: [String],
        tags: [String],
        answer: Number,
        subjectId: mongoose.Schema.Types.ObjectId,
    },
    { timestamps: true }
);
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
