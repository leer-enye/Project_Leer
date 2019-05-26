const mongoose = require('mongoose');

const { Schema } = mongoose;

// create schema
const UserSchema = new Schema(
    {
        accessToken: {
            type: String,
        },
        bio: {
            type: String,
        },
        email: {
            dropDups: true,
            required: true,
            type: String,
            unique: true,
        },
        firstName: {
            type: String,
        },
        highSchool: {
            type: String,
        },
        intendedUni: {
            type: String,
        },
        isAdmin: {
            default: false,
            type: Boolean,
        },
        lastName: {
            type: String,
        },
        name: {
            required: true,
            type: String,
        },
        password: {
            type: String,
        },
        picture: {
            required: true,
            type: String,
        },
        providerId: {
            required: true,
            type: String,
        },
        providerName: {
            default: 'local',
            type: String,
        },
        username: {
            type: String,
        },
    },
    { timestamps: true }
);
const User = mongoose.model('User', UserSchema);

module.exports = User;
