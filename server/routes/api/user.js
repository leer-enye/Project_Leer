const express = require('express');
const passport = require('passport');
// const secured = require('../../lib/middlewares/secured');
const AuthController = require('../../controllers/auth');

const router = express.Router();
module.exports = app => {
    app.use('/api/users', router);

    /**
	 * @route GET api/users/test
	 * @desc Tests user route
	 * @access Public
	 */
    router.get('/test', AuthController.test);

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
        AuthController.login
    );
    /**
	 * @route GET api/users/callback
	 * @desc Call back url for users registration and login
	 * @access Public
	 */
    router.get('/callback', AuthController.callback);

    /**
	 * @route GET api/users/users
	 * @desc Get users data after login
	 * @access Private
	 */
    // router.get('/users', secured(), AuthController.users);
    router.get('/users', AuthController.users);
    /**
	 * @route GET api/users/logout
	 * @desc users log out route
	 * @access Public
	 */
    router.get('/logout', AuthController.logout);
};
