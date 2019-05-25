const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const userInViews = require('./lib/middlewares/userInViews');
const routes = require('./routes');

dotenv.config();
const {
    NODE_ENV,
    PORT,
    DATABASE,
    SESSION_SECRET,
    COOKIE_MAX_AGE,
    DB_CONNECT_TIMEOUT,
} = process.env;
const dev = NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const _PORT = PORT || 5000;
const _COOKIE_MAX_AGE = !dev ? Number(COOKIE_MAX_AGE) : 1800000;
const _DB_CONNECT_TIMEOUT = !dev ? Number(DB_CONNECT_TIMEOUT) : 4000;

require('./lib/config/passport');

app.prepare()
    .then(() => {
        const server = express();
        // mongoose connection to remote database mlab
        mongoose
            .connect(DATABASE, {
                connectTimeoutMS: _DB_CONNECT_TIMEOUT,
                useCreateIndex: true,
                useFindAndModify: false,
                useNewUrlParser: true,
            })
            .then(() => {
                console.log(`MongoDB connected to ${DATABASE}`);
            })
            .catch(err => {
                console.log(err);
            });

        server.use('/_next', express.static(path.join(__dirname, '../.next')));
        server.use(
            '/static',
            express.static(path.join(__dirname, '../static'))
        );

        // body parser middleware
        server.use(
            bodyParser.urlencoded({
                extended: false,
            })
        );
        server.use(bodyParser.json());
        // morgan middleware
        server.use(morgan('dev'));
        server.use(cookieParser(SESSION_SECRET));

        // config express-session
        const sess = {
            cookie: { maxAge: _COOKIE_MAX_AGE },
            resave: false,
            rooling: true,
            saveUninitialized: false,
            secret: SESSION_SECRET,
            store: new MongoStore({ mongooseConnection: mongoose.connection }),
        };

        sess.cookie.secure = !dev; // serve secure cookies, requires https

        server.use(session(sess));

        // passport middleware
        server.use(passport.initialize());
        server.use(passport.session());

        // use routes
        server.use(userInViews());
        server.use('/', routes);

        server.get('*', (req, res) => handle(req, res));
        server.listen(_PORT, err => {
            if (err) throw err;
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
