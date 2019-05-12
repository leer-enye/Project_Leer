const mongoose = require('mongoose');

const { Schema } = mongoose;

// create schema
const UserSchema = new Schema(
    {
        avatar: {
            type: String,
        },
        email: {
            required: true,
            type: String,
        },
        firstName: {
            required: true,
            type: String,
        },
        isAdmin: {
            default: false,
            type: Boolean,
        },
        lastName: {
            required: true,
            type: String,
        },

        password: {
            required: true,
            type: String,
        },
    },
    { timestamps: true }
);
const User = mongoose.model('User', UserSchema);

module.exports = User;
