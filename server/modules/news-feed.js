var request = require('request');

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
module.exports.bingNews = function(queryParam, callback) {
  var bingHttpRequestOptions = {
    url : 'https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=' + queryParam + '&count=5&offset=0&mkt=en-us&safeSearch=Moderate&Category=politics',
    headers : { 'Ocp-Apim-Subscription-Key' : process.env.BING_NEWS_API }
  };

  var bingRequestCallBack = function(error, response, data) {
    if( error ) {
      console.error(error);
    } else {
      callback(data);
    }
  };
  request(bingHttpRequestOptions, bingRequestCallBack);
};