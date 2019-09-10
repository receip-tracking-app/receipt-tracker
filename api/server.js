// setup express server
const express = require("express");

const db = require("../data/dbConfig.js");

const userRouters = require("../userRouters.js");
const server = express();

server.use(express.json());
server.use("/", userRouters);

module.exports = server;
