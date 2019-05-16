/* eslint-disable sort-keys */
/* eslint-disable consistent-return */
const passport = require('passport');
const dotenv = require('dotenv');
const util = require('util');
const { URL } = require('url');
const querystring = require('querystring');
const HttpStatus = require('http-status-codes');

const StatusText = require('./constants');

const { SUCCESS, ERROR, FAIL } = StatusText;
const { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = HttpStatus;
// load user model
// const User = require('../models/User');

dotenv.config();

module.exports = {
    callback: async (req, res, next) => {
        try {
            // eslint-disable-next-line no-unused-vars
            await passport.authenticate('auth0', (err, user, info) => {
                console.log(info);
                console.log('Inside passport.authenticate() callback');
                console.log(
                    `req.session.passport: ${JSON.stringify(
                        req.session.passport
                    )}`
                );
                console.log(`req.user: ${JSON.stringify(req.user)}`);
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
                    const { returnTo } = req.session;
                    delete req.session.returnTo;
                    console.log('Inside req.login() callback');
                    console.log(
                        `req.session.passport: ${JSON.stringify(
                            req.session.passport
                        )}`
                    );
                    console.log(`req.user: ${JSON.stringify(req.user)}`);
                    res.redirect(returnTo || '/user'); // client side
                });
            })(req, res, next);
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).send({
                status: ERROR,
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            });
        }
    },
    login: async (req, res) => {
        try {
            res.redirect('/');
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).send({
                status: ERROR,
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            });
        }
    },
    logout: async (req, res) => {
        try {
            await req.logout();
            let returnTo = `${req.protocol}://${req.hostname}`;
            const port = req.connection.localPort;
            if (port !== undefined && port !== 80 && port !== 443) {
                returnTo += `:${port}`;
            }
            const logoutURL = new URL(
                util.format('https://%s/logout', process.env.AUTH0_DOMAIN)
            );
            const searchString = querystring.stringify({
                client_id: process.env.AUTH0_CLIENT_ID,
                returnTo,
            });
            logoutURL.search = searchString;

            res.redirect(logoutURL);
            // res.redirect('/home');
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).send({
                status: ERROR,
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            });
        }
    },
    test: async (req, res) => {
        try {
            res.status(200).json({ msg: 'user works' });
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).send({
                status: ERROR,
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            });
        }
    },
    users: async (req, res) => {
        try {
            const isAuthenticated = await req.isAuthenticated();
            console.log(`User authenticated? ${isAuthenticated}`);
            if (isAuthenticated) {
                const { _json } = await req.user;
                const user = _json;
                res.status(OK).send({
                    status: SUCCESS,
                    data: { user },
                });
            } else {
                res.status(UNAUTHORIZED).send({
                    status: FAIL,
                    data: { user: 'User Not Authorized' },
                });
            }
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).send({
                status: ERROR,
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            });
        }
    },
};
