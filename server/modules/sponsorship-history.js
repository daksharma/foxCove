var request = require('request');
var querystring = require('querystring');

// Retrieve and invoke callback on legislator's legislative sponsorship history
// from Sunlight Foundation Congressional API

module.exports = function(bioguide_id, callback){

  var url = 'https://congress.api.sunlightfoundation.com/bills?';

  // FILTER response object for following properties
  var queryFieldFilters = querystring.stringify({
    sponsor_id__in: bioguide_id,
    // ADD or REMOVE query fields here:
    fields: [
      'congress',
      'number',
      'official_title'
    ]
    .join()
  });

  var httpRequestOptions = {
    url: url + querystring.unescape(queryFieldFilters),
    headers: {
      'X-APIKEY': process.env.SUNLIGHT_API,
    }
  };

  request(httpRequestOptions, function(err, res, data){
    if( !err && res.statusCode === 200 ){
      callback(data);
    } else {
      console.error(err);
    }
  });
};
