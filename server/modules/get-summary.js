var request = require('request');
var cheerio = require('cheerio');

// Retrieve bill's legislative summary from GovTrack's bill summary page

module.exports = function(congress, type, number, callback){

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
      console.error('ERROR:', err);
      callback(err);
    }
  });
};
