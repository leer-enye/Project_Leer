const express = require('express');
const passport = require('passport');
const { auth, user } = require('../../controllers/');

const router = express.Router();
module.exports = app => {
    app.use('/api/users', router);

    // User Auth Routes
    router.get(
        '/login',
        passport.authenticate('auth0', {
            scope: 'openid email profile',
        }),
        auth.login
    );
    router.get('/callback', auth.callback);
    router.get('/users', auth.users);
    router.get('/logout', auth.logout);

    // User CRUD APIs
    router.post('/', user.create);
    router.get('/', user.findAll);
    router.get('/:userId', user.findOne);
    router.put('/:userId', user.update);
    router.delete('/:userId', user.delete);
};
