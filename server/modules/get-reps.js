var request = require('request');
var key = require('../secret/api-keys');
var querystring = require('querystring');

// Retrieve a location's legislative representatives

module.exports = function(zip, callback) {

  var url = 'https://congress.api.sunlightfoundation.com/legislators/locate?'
  var queryFields = querystring.stringify({
    zip: zip,
    // ADD or REMOVE query fields here:
    fields: [
      'bioguide_id',
      'first_name',
      'last_name',
      'title',
      'district',
      'oc_email',
      'twitter_id',
      'website',
      'party'
    ]
    .join()
  });

  var httpRequestOptions = {
    url: url + querystring.unescape(queryFields),
    headers: {
      'X-APIKEY': key.sunlight,
    }
  };

  request(httpRequestOptions, callback);
};
