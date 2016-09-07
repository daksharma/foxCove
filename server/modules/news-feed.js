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

// TODO: potentially useless since all of the links don't actually work.
module.exports.nyTimesNews = function (queryParam, callback) {
  var nyTimesRequestOptions = {
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    qs: {
      'api-key': process.env.NY_TIMES_NEWS_API,
      'q': queryParam,
      'fq': queryParam,
      'sort': "newest",
      'fl': "headline,web_url",
      'page': 5,
      'facet_filter': "true"
    }
  };
  var nyTimesRequestCallback = function(error, response, data) {
    if(error) {
      console.log(error);
    } else {
      callback(data);
    }
  };
  request(nyTimesRequestOptions, nyTimesRequestCallback);
};