var https = require('https');

module.exports = function(req, res, cb) {
  var geo;
  var geocoding = function() {
    return https.get({
      hostname: 'api.mapbox.com',
      path: '/geocoding/v5/mapbox.places/' + req.body.zipcode + '.json?access_token=' + process.env.MAPBOX_API
    }, function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        if (!body.includes('<')) {
          var parsed = JSON.parse(body);
          geo = parsed.features[0].geometry.coordinates;
          geo.push(process.env.MAPBOX_PUBLIC);
          cb(geo);
        }
      }).on('error', function(err) {
        console.log(err);
        res.sendStatus(500);
      });
    });
  };
  geocoding();
};