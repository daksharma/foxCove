var request = require('request');

// Retrieve news from Guardian for a specific rep

module.exports.getOfficials = function(inputPackage, outputPackage, nextCB){


  var requestCallback = function(error, response, data){
    if( error ){
      console.error(error);
    } else {
      try {
        data = JSON.parse(data);
        outputPackage.city = data.normalizedInput.city;
        var offices = data.offices;
        for(var i = 0; i < offices.length; i++){
          var title = offices[i].name;
          if (!title.includes('United States')) {
            for(var j = 0; j < offices[i].officialIndices.length;j++){
              var index = offices[i].officialIndices[j];
              if(!outputPackage[title]){
                outputPackage[title] = [];
              }
              outputPackage[title].push(data.officials[index]);
            }
          }
        }
        nextCB();
      } catch( err ) {
        console.error(err);
      }
    }
  };

  var httpRequestOptions = {
    url: 'https://www.googleapis.com/civicinfo/v2/representatives?address='+inputPackage.zip+'&key=' + process.env.GOOGLE_API,
  };

  request(httpRequestOptions, requestCallback);

};
