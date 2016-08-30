var pg = require('pg');
var config = require('./uri-config.js')

pg.defaults.ssl = true;

pg.connect(config.postgresUrl, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres!');

  client
    .query('SELECT DISTINCT firstname, lastname, legislators.district FROM legislators, zips WHERE zips.zipcode = 94015 AND in_office = \'1\' AND legislators.state = zips.state AND (legislators.district = zips.district OR legislators.district = \'Junior Seat\' OR legislators.district = \'Senior Seat\')')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});