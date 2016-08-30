var pg = require('pg');
pg.defaults.ssl = true;
var knex = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRES_DB_URI
});

module.exports = require('bookshelf')(knex);
