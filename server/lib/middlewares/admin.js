const admin = (req, res, next) => {
    if (req.user.isAdmin === false) {
        return res.send('You are not an admin');
    }
    return next();
};
module.exports = admin;
