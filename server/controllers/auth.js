/* eslint-disable sort-keys */
/* eslint-disable consistent-return */
const passport = require('passport');
const dotenv = require('dotenv');
const util = require('util');
const { URL } = require('url');
const querystring = require('querystring');
const HttpStatus = require('http-status-codes');
const { AuthUrls, Ports, StatusText } = require('./constants');

const { loginURL, logoutURL: logoutURLTemplate, returnToURL } = AuthUrls;
const { httpPort, httpsPort } = Ports;
const { SUCCESS, ERROR, FAIL } = StatusText;
const { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = HttpStatus;

dotenv.config();

module.exports = {
    callback: (req, res, next) => {
        try {
            passport.authenticate('auth0', (err, user) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect(loginURL); // client side
                }
                req.logIn(user, error => {
                    if (error) {
                        return next(error);
                    }
                    const { returnTo } = req.session;
                    delete req.session.returnTo;
                    res.redirect(returnTo || returnToURL); // client side
                });
            })(req, res, next);
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).send({
                status: ERROR,
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            });
        }
    },
    login: (req, res) => {
        try {
            res.redirect('/');
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).send({
                status: ERROR,
                message: HttpStatus.getStatusText(INTERNAL_SERVER_ERROR),
            });
        }
    },
    logout: (req, res) => {
        try {
            req.logout();
            let returnTo = `${req.protocol}://${req.hostname}`;
            const port = req.connection.localPort;

            if (port !== undefined && port !== httpPort && port !== httpsPort) {
                returnTo += `:${port}`;
            }

            const logoutURL = new URL(
                util.format(logoutURLTemplate, process.env.AUTH0_DOMAIN)
            );
            const searchString = querystring.stringify({
                client_id: process.env.AUTH0_CLIENT_ID,
                returnTo,
            });
            logoutURL.search = searchString;
            res.redirect(logoutURL);
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

            if (isAuthenticated) {
                const user = await req.user;
                res.status(OK).send({
                    status: SUCCESS,
                    data: { user },
                });
            } else {
                res.status(UNAUTHORIZED).send({
                    status: FAIL,
                    message: HttpStatus.getStatusText(UNAUTHORIZED),
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
