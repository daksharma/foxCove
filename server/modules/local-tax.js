var request = require('request');
var capitalize = require('./capitalize');


module.exports = function(zip, callback){

    var destination = 'https://taxrates.api.avalara.com:443/postal?country=usa&postal='+ zip + '&apikey=' + process.env.TAX_API;

    // var requestCallback = function(error, response, data){
    //     if(error) throw error;
    //     try {
    //       data = JSON.parse(data);
    //       callback(data);
    //       output.total = data.totalRate;
    //       output.breakdowns = [];
    //       var arr = data.rates;
    //       if (arr) {
    //         for(var i = 0; i < arr.length; i++){
    //           var str = capitalize(arr[i].name) + " " + arr[i].type + " tax: " + arr[i].rate + "%";
    //           output.breakdowns.push(str);
    //         }
    //       }
    //       callback(output);
    //     } catch( err ) {
    //       console.error(err);
    //     }
    // };
    //
    request(destination, function(err, res, data){
      callback(data);
    });

};
