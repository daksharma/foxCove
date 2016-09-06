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
    per_page: '20',
    fields: [
      'congress',
      'number',
      'bill_type',
      'official_title',
      'popular_title',
      'short_title',
      'introduced_on'
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
      }).toArray();

      var locSummary = $("#libraryofcongress").children("p").map(function(){
        return $(this).text();
      }).toArray();

      if( govTrackSummary[0] !== "We don’t have a summary available yet." ){
        callback(govTrackSummary);

      } else if( locSummary[1] !== "No summary available." ){
        callback(locSummary);

      } else {
        callback(['Summary for this bill not yet written. Please try again later.']);
      }

    } else {
      console.error(err);
      callback(err);
    }
  });
};


// Retrieve information about a specified bill's history from GovTrack
// Congressional API

module.exports.info = function (congress, type, number, callback) {

  var conversionObj = {
    hr: "house_bill",
    hres: "house_resolution",
    hjres: "house_joint_resolution",
    hconres: "house_concurrent_resolution",
    s: "senate_bill",
    sres: "senate_resolution",
    sjres: "senate_joint_resolution",
    sconres: "senate_concurrent_resolution"
  };

  var url = 'https://www.govtrack.us/api/v2/bill/';

  var queryFieldFilters = querystring.stringify({
    congress: congress,
    bill_type: conversionObj[type],
    number: number,
  });

  var httpRequestOptions = {
    url: url + '?' + querystring.unescape(queryFieldFilters),
  };

  request(httpRequestOptions, function (err, res, data) {
    if( !err && res.statusCode === 200 ){
      // TRY to parse data
      try {
        // GET bill id
        var id = JSON.parse(data).objects[0].id;
        // GET bill from id
        request(url + id, function(err, res, data) {
          if( !err && res.statusCode === 200 ){
            callback(data);
          } else {
            throw new Error(err);
          }
        });
      } catch(error) {
        callback(error);
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
      });
    });
  });

  Promise.all(promises)
  .then(function(bills) {
    // INVOKE callback on bills object after all promises resolved
    callback(bills);
  })
  .catch(function(err){
    console.error(err);
  });
};
