var https = require('https');

module.exports = function(req, res, cb) {
  var coordinates = req.body; // These need to be given in opposite order to Mapbox's preferred format
  https.get({
    hostname: 'openstates.org',
    path: '/api/v1/legislators/geo/?lat=' + coordinates[1] + '&long=' + coordinates[0] + '&apikey=' + process.env.SUNLIGHT_API
  }, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    }).on('end', function(err) {
      if (body) {
        cb(body);
      } else {
        console.log('Something went wrong.', err);
        return false;
      }
    });
  });
};
