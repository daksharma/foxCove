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
