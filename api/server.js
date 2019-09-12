// setup express server
const express = require("express");
const session = require("express-session");
const server = express();
const KnexSessionStore = require("connect-session-knex")(session);

const userRouters = require("../userRouters.js");
const knexConnection = require("../data/dbConfig.js");

server.use(express.json());

const sessionOptions = {
    name: "session",
    secret: "tsss",
    cookie: {
        maxAge: 1 * 60 * 15,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: knexConnection,
        createtable: true,
        clearInterval: 1000 * 60 * 30
    })
};

server.use(session(sessionOptions));
server.use("/api/", userRouters);

module.exports = server;
