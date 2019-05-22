const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const dotenv = require('dotenv');
const User = require('../../models/User');

dotenv.config();

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        callbackURL:
			process.env.AUTH0_CALLBACK_URL ||
			'http://localhost:5000/api/users/callback',
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        domain: process.env.AUTH0_DOMAIN,
    },
    async (accessToken, refreshToken, extraParams, profile, done) =>
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    {
        console.log('Inside Auth Strategy Callback');
        const { email, name, picture, sub } = profile._json;
        const providerDetail = sub.split('|');
        const providerId = providerDetail[1];
        const providerName = providerDetail[0];

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log(userExists);
        } else {
            const user = new User({
                accessToken,
                email,
                name,
                picture,
                providerId,
                providerName,
            });

            const data = await user.save();

            return done(null, data);
        }
    }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser((user, done) => {
    console.log('Saving User to Session');
    console.log(user);
    if (user.id) {
        done(null, user._id);
    } else {
        console.log('empty user');
        console.log(user);
    }
});

passport.deserializeUser(async (id, done) => {
    console.log('Getting User from Session');
    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    done(null, user);
});
