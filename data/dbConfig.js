const knex = require('knex');

const dbConfig = require('../knexfile');

const environment = process.env.DB_ENV || 'development';

module.exports = knex(dbConfig[environment]);