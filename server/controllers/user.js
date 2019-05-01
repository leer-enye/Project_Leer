/* eslint-disable consistent-return */
const passport = require('passport');
const dotenv = require('dotenv');
const util = require('util');
const { URL } = require('url');
const querystring = require('querystring');
// load user model
// const User = require('../models/User');

dotenv.config();

module.exports = {
    callback: (req, res, next) => {
        // eslint-disable-next-line no-unused-vars
        passport.authenticate('auth0', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login'); // client side
            }
            req.logIn(user, error => {
                if (error) {
                    return next(error);
                }
                console.log('user data', user.profile);
                // const {profile}
                // const dataToSave = {
                //     avatar: user.picture,
                //     email: user.emails[0].value,
                //     firstName: user.name.givenName,
                //     lastName: user.name.familyName,
                // };
                // console.log('data to save', dataToSave);
                const { returnTo } = req.session;
                delete req.session.returnTo;
                res.redirect(returnTo || '/user'); // client side
            });
        })(req, res, next);
    },
    login: (req, res) => {
        res.redirect('/');
    },
    logout: (req, res) => {
        req.logout();
        let returnTo = `${req.protocol}://${req.hostname}`;
        const port = req.connection.localPort;
        if (port !== undefined && port !== 80 && port !== 443) {
            returnTo += `:${port}`;
        }
        const logoutURL = new URL(util.format('https://%s/logout', process.env.AUTH0_DOMAIN));
        const searchString = querystring.stringify({
            client_id: process.env.AUTH0_CLIENT_ID,
            returnTo,
        });
        logoutURL.search = searchString;

        res.redirect(logoutURL);
    },
    test: (req, res) => {
        res.status(200).json({ msg: 'user works' });
    },
    users: (req, res) => {
        console.log('user dashboard page available');
        const { _raw, _json, ...userProfile } = req.user;
        console.log('user dashboard', userProfile);
        res.status(200).json(...userProfile);
    },
};
