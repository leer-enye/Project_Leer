/* eslint-disable func-names */
/**
 * The purpose of this middleware is to have the `user`
 * object available for all views.
 *
 * This is important because the user is used in layout.pug.
 */
module.exports = function() {
    return function(req, res, next) {
        res.locals.user = req.user;
        next();
    };
};

// const userInViews = (req, res, next) => {
//     res.locals.user = req.user;
//     next();
//     return res.status(200).json({ msg: 'User is available' });
// };
// module.exports = userInViews;
