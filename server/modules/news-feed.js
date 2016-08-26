var request = require('request');
var key = require('../secret/api-keys');

// Retrieve news from Guardian for a specific rep

module.exports.getNews = function(inputPackage, outputPackage, nextCB){


  var requestCallback = function(error, response, data){
    if( error ){
        console.error(error);
    } else {
        data = JSON.parse(data);
        outputPackage.news = data.response.results;
        nextCB();
    }
  }

  var httpRequestOptions = {
    url: 'http://content.guardianapis.com/search?q=' + inputPackage.firstName + "," + inputPackage.lastName + "," + inputPackage.role + ',politics/sectionId=politics',
    headers: {
      'api-key': key.guardian,
    }
  }

  request(httpRequestOptions, requestCallback);

};


