var request = require('request');
var key = require('../secret/api-keys');

// Retrieve information about a specified bill's history from Sunlight Foundation
// Congressional API

module.exports = function(bill_id, callback) {
  
  var httpRequestOptions = {
    url: 'https://congress.api.sunlightfoundation.com/bills?bill_id=' + bill_id,
    headers: {
      'X-APIKEY': key.sunlight,
    }
  };

  request(httpRequestOptions, callback)
};
