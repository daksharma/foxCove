var request = require('request');
var key = require('../secret/api-keys');

// Retrieve a legislator's legislative sponsorship history from Sunlight Foundation
// Congressional API

module.exports = function(bioguide_id, callback){

  var httpRequestOptions = {
    url: 'https://congress.api.sunlightfoundation.com/bills?sponsor_id__in=' + bioguide_id,
    headers: {
      'X-APIKEY': key.sunlight,
    }
  };

  request(httpRequestOptions, callback);
};
