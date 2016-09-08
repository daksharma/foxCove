var request = require('request');
var mongoDb = require('../../db/mdb-config');

// Retrieve news from Guardian for a specific rep

module.exports.getNews = function(inputPackage, outputPackage, nextCB){


  var requestCallback = function(error, response, data){
    if( error ){
        console.error(error);
    } else {
      try {
        data = JSON.parse(data);
        outputPackage.news = data.response.results;
        nextCB();
      } catch( err ) {
        console.error(err);
      }
    }
  };

  var httpRequestOptions = {
    url: 'http://content.guardianapis.com/search?q=' + inputPackage.firstName + "," + inputPackage.lastName + "," + inputPackage.role + ',politics/sectionId=politics',
    headers: {
      'api-key': key.guardian,
    }
  };

  request(httpRequestOptions, requestCallback);

};

// us this until we find better api to meets our need with fine tuned results
module.exports.makeBingApiCall = function(queryParam, bioguide_id, callback) {
  console.log("inside Bing search about to start");
  var bingHttpRequestOptions = {
    url : 'https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=' + queryParam + '&count=5&offset=0&mkt=en-us&safeSearch=Moderate&Category=politics',
    headers : { 'Ocp-Apim-Subscription-Key' : process.env.BING_NEWS_API }
  };

  console.log("Making Bing API Call!!!!!", bioguide_id);
  request(bingHttpRequestOptions, function(error, response, data) {
    if( error ) {
      console.error(error);
    } else {
      try {
        var repNewsData = JSON.parse(data);
        // repNewsData.value are the actual articles from the data
        mongoDb.saveRepNews(bioguide_id, repNewsData.value, callback);
      } catch(e) {
        console.log(e);
      }
    }
  });
};
