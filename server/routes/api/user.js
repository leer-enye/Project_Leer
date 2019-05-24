const express = require('express');
const passport = require('passport');
const AuthController = require('../../controllers/auth');
const UserController = require('../../controllers/user');

const router = express.Router();
module.exports = app => {
    app.use('/api/users', router);

    // User Auth Routes
    router.get(
        '/login',
        passport.authenticate('auth0', {
            scope: 'openid email profile',
        }),
        AuthController.login
    );
    router.get('/callback', AuthController.callback);
    router.get('/users', AuthController.users);
    router.get('/logout', AuthController.logout);

    // User CRUD APIs
    router.post('/', UserController.create);
    router.get('/', UserController.findAll);
    router.get('/:userId', UserController.findOne);
    router.put('/:userId', UserController.update);
    router.delete('/:userId', UserController.delete);
};
