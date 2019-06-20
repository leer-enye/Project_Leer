const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const dotenv = require('dotenv');
const User = require('../../../models/User');
const { FALL_BACK_URL } = require('./constants');

dotenv.config();

const {
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL,
} = process.env;
const callbackURL = AUTH0_CALLBACK_URL || FALL_BACK_URL;

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        callbackURL,
        clientID: AUTH0_CLIENT_ID,
        clientSecret: AUTH0_CLIENT_SECRET,
        domain: AUTH0_DOMAIN,
    },
    async (accessToken, refreshToken, extraParams, profile, done) =>
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    {
        const { email, name, picture, sub } = profile._json;
        const [providerName, providerId] = sub.split('|');
        const [firstName, lastName] = name.split(' ');
        const newUser = {
            accessToken,
            email,
            firstName,
            lastName,
            name,
            picture,
            providerId,
            providerName,
        };

        console.log('New User ==> ', newUser, '\n\n\n\n');

        const user = new User(newUser);
        let updatedData = {};
        const userExists = await User.findOne({ email });

        console.log('User exists ==> ', userExists, '\n\n\n\n');

        if (userExists) {
            // Update User Access Token
            const { id } = userExists;
            // Find user and update it with the request body
            updatedData = await User.findByIdAndUpdate(id, newUser, {
                new: true,
            });
        } else {
            updatedData = await user.save();
        }

        console.log('Updated Data ==> ', updatedData, '\n\n\n\n');

        return done(null, updatedData);
    }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser((user, done) => {
    if (user.id) {
        done(null, user._id);
    }
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
