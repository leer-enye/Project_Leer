/* eslint-disable func-names */
/**
 * This is an example middleware that checks if the user is logged in.
 *
 * If the user is not logged in, it stores the requested url in `returnTo` attribute
 * and then redirects to `/login`.
 *
 */
// module.exports = function() {
//     return function secured(req, res, next) {
//         if (req.user) {
//             return next();
//         }
//         req.session.returnTo = req.originalUrl;
//         res.redirect('/login');
//     };
// };

// const secured = (req, res, next) => {
//     if (req.user) {
//         return next();
//     }
//     req.session.returnTo = req.originalUrl;
//     res.redirect('/login');
//     return res.status(400).json({ msg: 'You are not logged in' });
// };
// module.exports = secured;
module.exports = function() {
    // eslint-disable-next-line consistent-return
    return function secured(req, res, next) {
        if (req.user) {
            return next();
        }
        req.session.returnTo = req.originalUrl;
        res.redirect('/login');
    };
};
