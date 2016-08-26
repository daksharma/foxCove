var request = require('request');
var key = require('../secret/api-keys');

// Retrieve news from Guardian for a specific rep

module.exports = function(fullname, callback){

  var httpRequestOptions = {
    url: 'https://congress.api.sunlightfoundation.com/bills?sponsor_id__in=' + bioguide_id,
    headers: {
      'X-APIKEY': key.guardian,
    }
  }

  request(httpRequestOptions, callback);

};
