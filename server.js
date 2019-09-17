const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

const db = require('./database/dbConfig');
const Users = require('./users/users-model');
const restricted = require('./auth/restricted-middleware');
dbConnection = require('./database/dbConfig');
const server = express();

const sessionConfig = {
    name: 'monkey', // will default to 'sid' if not specified which can easily be hacked
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe!', // used to encrypt and decrypt cookie
    cookie: {
        maxAge: 1000 * 30, // set in ms so this is 1sec x 30 or 30 sec the cookie is valid for
        secure: false, // set to 'true' in production
        httpOnly: true, // ensures the user can't access cookie via js 
    },
    resave: false, // don't recreate cookie, keep the ones there
    saveUninitialized: false, // GDPR laws against setting cookies automatically so user must agree before setting to true so must be dynamic value
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: 'knexsessions',
        sidfieldname: 'sessionid',
        createtable: true,
        clearInterval: 1000 * 60 * 30,
    }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send("It's working!");
});

// another way to test 
// server.get('/', (req, res) => {
//     res.json({api: 'up'});
// });

module.exports = server;
