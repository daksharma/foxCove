var https = require('https');

module.exports = function(req, res, cb) {
  var bioguideId = req.body.bioguideId; //front end request should be in the format {bioguideId: bioguideId}
  https.get({
    hostname: 'congress.api.sunlightfoundation.com',
    path: '/bills?sponsor_id=' + bioguideId + '&order=last_action_at&apikey=' + process.env.SUNLIGHT_API
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
