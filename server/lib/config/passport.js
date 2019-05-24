const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const dotenv = require('dotenv');
const User = require('../../models/User');

dotenv.config();

const callbackURL =
	process.env.NODE_ENV === 'production'
	    ? process.env.AUTH0_CALLBACK_URL
	    : 'http://localhost:5000/api/users/callback';

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        callbackURL,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        domain: process.env.AUTH0_DOMAIN,
    },
    async (accessToken, refreshToken, extraParams, profile, done) =>
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    {
        const { email, name, picture, sub } = profile._json;
        const [providerName, providerId] = sub.split('|');
        const newUser = {
            accessToken,
            email,
            name,
            picture,
            providerId,
            providerName,
        };

        const user = new User(newUser);
        let updatedData = {};
        const userExists = await User.findOne({ email });

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
