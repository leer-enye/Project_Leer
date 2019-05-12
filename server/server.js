const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const userInViews = require('./lib/middlewares/userInViews');
const routes = require('./routes');

dotenv.config();
const { NODE_ENV, PORT, DATABASE, SESSION_SECRET } = process.env;
const dev = NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const _PORT = PORT || 5000;

require('./lib/config/passport');

app.prepare()
    .then(() => {
        const server = express();
        // mongoose connection to remote database mlab
        mongoose
            .connect(DATABASE, { useNewUrlParser: true })
            .then(() => {
                console.log(`MongoDB connected to ${DATABASE}`);
            })
            .catch(err => {
                console.log(err);
            });
        // passport middleware
        server.use(passport.initialize());
        server.use(passport.session());

        // body parser middleware
        server.use(
            bodyParser.urlencoded({
                extended: false,
            })
        );
        server.use(bodyParser.json());
        // morgan middleware
        server.use(morgan('dev'));
        server.use(cookieParser());
        // config express-session
        const sess = {
            cookie: {},
            resave: false,
            saveUninitialized: true,
            secret: SESSION_SECRET,
        };

        if (!dev) {
            sess.cookie.secure = true; // serve secure cookies, requires https
        }

        server.use(session(sess));

        // use routes
        server.use(userInViews());
        server.use('/', routes);

        // get all routes
        server.get('*', (req, res) => handle(req, res));
        server.get('/', (req, res) => {
            res.send('Server Okay from jude');
        });

        // server output
        server.listen(PORT, err => {
            if (err) throw err;
            console.log(`Server ready on http://localhost:${_PORT}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
