const express = require('express');
const passport = require('passport');
const { Auth, User } = require('../../controllers/');

const router = express.Router();
module.exports = app => {
    app.use('/api/users', router);

    // User Auth Routes
    router.get(
        '/login',
        passport.authenticate('auth0', {
            scope: 'openid email profile',
        }),
        Auth.login
    );
    router.get('/callback', Auth.callback);
    router.get('/users', Auth.users);
    router.get('/logout', Auth.logout);

    // User CRUD APIs
    router.post('/', User.create);
    router.get('/', User.findAll);
    router.get('/:userId', User.findOne);
    router.put('/:userId', User.update);
    router.delete('/:userId', User.delete);
};
