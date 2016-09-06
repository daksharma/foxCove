var https   = require('https');

// Retrieve State Rep Detail

module.exports.rep = function(req, res, cb) {
  var leg_id = req;
  https.get({
    hostname: 'openstates.org',
    path: '/api/v1/legislators/' + leg_id + '/?apikey=' + process.env.SUNLIGHT_API
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

// Retrieve Bills Sponsored By Rep

module.exports.bills = function(req, res, cb) {
  var leg_id = req;
  https.get({
    hostname: 'openstates.org',
    path: '/api/v1/bills/?sponsor_id=' + leg_id + '&apikey=' + process.env.SUNLIGHT_API
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