const express = require('express');
const passport = require('passport');

const router = express.Router();
const UserController = require('../../controllers/user');

/**
 * @route GET api/users/test
 * @desc Tests user route
 * @access Public
 */
router.get('/test', UserController.test);

/**
 * @route GET api/users/login
 * @desc Login user route
 * @access Public
 */
router.get(
    '/login',
    passport.authenticate('auth0', {
        scope: 'openid email profile',
    }),
    UserController.login
);
/**
 * @route GET api/users/callback
 * @desc Call back url for users registration and login
 * @access Public
 */
router.get('/callback', UserController.callback);

module.exports = router;
