/* eslint-disable sort-keys */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContentSchema = new Schema(
    {
        title: String,
        resourceType: String,
        tags: [String],
        url: String,
        subjectId: mongoose.Schema.Types.ObjectId,
    },
    { timestamps: true }
);
const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
