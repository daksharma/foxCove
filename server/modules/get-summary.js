var request = require('request');
var cheerio = require('cheerio');

// Retrieve bill's legislative summary from GovTrack's bill summary page

module.exports = function(congress, number, callback){

  var url = 'https://www.govtrack.us/congress/bills/';

  var httpRequestOptions = {
    url: url + congress + '/' + number + '/summary',
  };

  request(httpRequestOptions, function(err, res, rawHtml){
    if( !err && res.statusCode === 200 ){

      var $ = cheerio.load(rawHtml);
      callback($("#oursummary").children("p"));
      
    } else {
      console.error(err);
      callback(err);
    }
  });
};

module.exports('114', 's1919', console.log);
