const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const dotenv = require('dotenv');

dotenv.config();

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:5000/api/users/callback',
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        domain: process.env.AUTH0_DOMAIN,
    },
    (accessToken, refreshToken, extraParams, profile, done) =>
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
        done(null, profile)
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
