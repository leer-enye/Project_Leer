// load user model
const passport = require('passport');
const User = require('../models/User');

module.exports = {
    callback: (req, res, next) => {
        passport.authenticate('auth0', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(404).json({ msg: 'User not logged in redirect to login page' });
                // return res.redirect('/login');
            }
            req.logIn(user, err => {
                if (err) {
                    return next(err);
                }
                // const returnTo = req.session;
                // delete req.session.returnTo;
                // res.redirect(returnTo || '/user');
                res.status(200).json(user);
            });
        })(req, res, next);
    },
    login: (req, res) => {
        res.json({ msg: 'Redirecting to base url' });
    },
    test: (req, res) => {
        res.json({ msg: 'user works' });
    },
};
