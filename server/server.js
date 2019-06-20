const bodyParser = require('body-parser');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const morgan = require('morgan');
const next = require('next');
const passport = require('passport');
const path = require('path');

const routes = require('./routes');
const socketioConfig = require('./lib/config/socketio');
const userInViews = require('./lib/middlewares/userInViews');

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
const server = express();
const httpServer = http.Server(server);
const io = socketio(httpServer);
const handle = app.getRequestHandler();
const _PORT = PORT || 5000;
const _COOKIE_MAX_AGE = !dev ? Number(COOKIE_MAX_AGE) : 1800000;
const _DB_CONNECT_TIMEOUT = !dev ? Number(DB_CONNECT_TIMEOUT) : 4000;

require('./lib/config/passport');

app.prepare()
    .then(() => {
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
        server.use(express.static(__dirname, { dotfiles: 'allow' }));
        server.use(
            bodyParser.urlencoded({
                extended: false,
            })
        );
        server.use(bodyParser.json());
        server.use(morgan('dev'));
        server.use(cookieParser(SESSION_SECRET));

        const MongoStore = connectMongo(session);
        const sess = {
            cookie: { maxAge: _COOKIE_MAX_AGE },
            resave: false,
            rooling: true,
            saveUninitialized: false,
            secret: SESSION_SECRET,
            store: new MongoStore({ mongooseConnection: mongoose.connection }),
        };

        if (NODE_ENV === 'production') {
            server.set('trust proxy', 1); // trust first proxy
            sess.cookie.secure = true; // serve secure cookies, requires https
        }

        server.use(session(sess));
        server.use(passport.initialize());
        server.use(passport.session());
        server.use(userInViews());
        server.use('/', routes);

        server.get('*', (req, res) => handle(req, res));

        socketioConfig(io);

        httpServer.listen(_PORT, err => {
            if (err) throw err;
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
