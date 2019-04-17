const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const users = require('./routes/api/user');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

app.prepare()
    .then(() => {
        const server = express();
        // mongoose connection to remote database mlab
        mongoose
            .connect(process.env.DATABASE, { useNewUrlParser: true })
            .then(() => {
                console.log(`MongoDB connected to ${process.env.DATABASE}`);
            })
            .catch(err => {
                console.log(err);
            });

        // body parser middleware
        server.use(
            bodyParser.urlencoded({
                extended: false,
            })
        );
        server.use(bodyParser.json());
        // morgan middleware
        server.use(morgan('combined'));

        // use routes
        server.use('/api/users', users);

        // get all routes
        server.get('*', (req, res) => handle(req, res));
        // server.get('/', (req, res) => {
        //     res.send('Server Okay from jude');
        // });

        // server output
        server.listen(PORT, err => {
            if (err) throw err;
            console.log(`Server ready on http://localhost:${PORT}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit();
    });
