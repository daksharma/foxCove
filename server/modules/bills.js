var request = require('request');
var cheerio = require('cheerio');
var querystring = require('querystring');

// Retrieve legislator's legislative sponsorship history from Sunlight Foundation
// Congressional API and invoke callback on that history

module.exports.history = function(bioguide_id, callback){

  var url = 'https://congress.api.sunlightfoundation.com/bills?';

  // FILTER response object for following properties
  var queryFieldFilters = querystring.stringify({
    sponsor_id__in: bioguide_id,
    // ADD or REMOVE query fields here:
    per_page: '5',
    fields: [
      'congress',
      'number',
      'bill_type',
      'official_title',
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
      callback(err);
    }
  });
};

// Retrieve bill's legislative summary from GovTrack's bill summary page

module.exports.summary = function(congress, type, number, callback){

  var url = 'https://www.govtrack.us/congress/bills/' + congress + '/' + type + number + '/summary';

  var httpRequestOptions = {
    url: url,
  };

  request(httpRequestOptions, function(err, res, html){
    if( !err && res.statusCode === 200 ){

      var $ = cheerio.load(html);

      var govTrackSummary = $("#oursummary").children("p").map(function(){
        return $(this).text();
      }).toArray().join('\n');

      var locSummary = $("#libraryofcongress").children("p").map(function(){
        return $(this).text();
      }).toArray();

      if( govTrackSummary !== "We don’t have a summary available yet." ){
        callback(govTrackSummary);

      } else if( locSummary[1] !== "No summary available." ){
        callback(locSummary.join('\n'));

      } else {
        callback('Summary for this bill not yet written. Please try again later.');
      }

    } else {
      console.error(err);
      callback(err);
    }
  });
};


// Consolidate GET requests before responding to client

module.exports.summPromiseMap = function(bills, callback){

  // CREATE new promises array
  var promises = bills.map(function(bill){

    return new Promise(function(resolve){
      module.exports.summary(bill.congress, bill.bill_type, bill.number, function(data){
        // PUT data into bills object
        bill.summary = data;
        // RESOLVE promise
        resolve(bill);
      })
    });
  });

  Promise.all(promises)
  .then(function(bills) {
    // INVOKE callback on bills object after all promises resolved
    callback(bills);
  })
  .catch(function(err){
    console.log(err);
  })
}
