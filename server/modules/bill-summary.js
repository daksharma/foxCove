var request = require('request');
var key = require('../secret/api-keys');

// Retrieve information about a specified bill's history from Sunlight Foundation
// Congressional API

exports.congressBillSummary = function(bill_id, callback) {

  var httpRequestOptions = {
    url: 'https://congress.api.sunlightfoundation.com/bills?bill_id=' + bill_id,
    headers: {
      'X-APIKEY': key.sunlight,
    }
  };
  request(httpRequestOptions, callback)
};

exports.govTrackBillSummary = function (bill_id, callback) {
  var govTrackUrl = 'https://www.govtrack.us/api/v2/bill/' + bill_id;
  request(govTrackUrl, function (error, response, data) {
    if (!error && response.statusCode === 200) {
      callback.send(data);
    } else {
      console.log(error);
    }
  });
};
