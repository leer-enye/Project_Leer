const express = require('express');

const server = express();
const httpServer = require('http').Server(server);
const io = require('socket.io')(httpServer);
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

        const queue = []; // list of sockets waiting for peers
        const rooms = {}; // map socket.id => room
        const names = {}; // map socket.id => name
        const allUsers = {}; // map socket.id => socket

        // eslint-disable-next-line no-unused-vars
        const findPeerForLoneSocket = socket => {
            // this is place for possibly some extensive logic
            // which can involve preventing two people pairing multiple times
            if (queue) {
                // somebody is in queue, pair them!
                const peer = queue.pop();
                const room = `${socket.id}#${peer.id}`;
                // join them both
                peer.join(room);
                socket.join(room);
                // register rooms to their names
                rooms[peer.id] = room;
                rooms[socket.id] = room;
                // exchange names between the two of them and start the chat
                peer.emit('chat start', { name: names[socket.id], room });
                socket.emit('chat start', { name: names[peer.id], room });
            } else {
                // queue is empty, add our lone socket
                queue.push(socket);
            }
        };
        /*         io.on('connect', socket => {
            socket.emit('now', {
                message: 'Zeit',
            });
        }); */

        io.on('connection', socket => {
            console.log(`User ${socket.id} connected`);
            socket.on('login', data => {
                names[socket.id] = data.username;
                allUsers[socket.id] = socket;
                console.log(names);
                console.log(allUsers);
                // now check if sb is in queue
                // findPeerForLoneSocket(socket);
            });
            /*  socket.on('message', data => {
                const room = rooms[socket.id];
                socket.broadcast.to(room).emit('message', data);
            });
            socket.on('leave room', () => {
                const room = rooms[socket.id];
                socket.broadcast.to(room).emit('chat end');
                let peerID = room.split('#');
                peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
                // add both current and peer to the queue
                findPeerForLoneSocket(allUsers[peerID]);
                findPeerForLoneSocket(socket);
            });
            socket.on('disconnect', () => {
                const room = rooms[socket.id];
                socket.broadcast.to(room).emit('chat end');
                let peerID = room.split('#');
                peerID = peerID[0] === socket.id ? peerID[1] : peerID[0];
                // current socket left, add the other one to the queue
                findPeerForLoneSocket(allUsers[peerID]);
            }); */
        });

        httpServer.listen(_PORT, err => {
            if (err) throw err;
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
