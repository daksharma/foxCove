var pg = require('pg');
pg.defaults.ssl = true;
var config = require('./uri-config.js')
var knex = require('knex')({
  client: 'pg',
  connection: config.postgresUrl
});

module.exports = require('bookshelf')(knex);