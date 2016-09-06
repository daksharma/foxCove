var request = require('request');

module.exports = function(req, res){

    var input = req.body;
    var output = {};

    var positions = 'http://www.opensecrets.org/api/?method=memPFDprofile&year=2016&cid=' + input.crp_id + '&output=json&apikey=' + process.env.OPENSECRETS_API;

    var topCompanies = 'http://www.opensecrets.org/api/?method=candContrib&year=2016&cid=' + input.crp_id + '&output=json&apikey=' + process.env.OPENSECRETS_API;

    var topIndustries = 'http://www.opensecrets.org/api/?method=candIndustry&year=2016&cid=' + input.crp_id + '&output=json&apikey=' + process.env.OPENSECRETS_API;


    // console.log(destination)

    var collectIndustries = function(error, response, data){
        if (error) throw error;
        try {
          data = JSON.parse(data);
          output.industryLink = data.response.industries['@attributes'].source; //link to opensecret page
          output.industries = [];
          var arr = data.response.industries.industry;
          var rounds = Math.min(arr.length, 5);
          for(var i = 0; i < rounds; i++){
            output.industries.push(arr[i]["@attributes"]);
          }
          res.send(output);
        } catch( err ) {
          console.error(err);
        }
    };

    var collectCompanies = function(error, response, data){
        if (error) throw error;
        try {
          data = JSON.parse(data);
          output.companyLink = data.response.contributors['@attributes'].source; //link to opensecret page
          output.companies = [];
          var arr = data.response.contributors.contributor;
          var rounds = Math.min(arr.length, 5);
          for(var i = 0; i < rounds; i++){
            output.companies.push(arr[i]["@attributes"]);
          }
          request(topIndustries, collectIndustries);
        } catch( err ) {
          console.error(err);
        }
    };

    var collectPositions = function(error, response, data){
        if (error) throw error;
        try {
          data = JSON.parse(data);
          output.positions = [];
          if(data.response.member_profile.positions){
            console.log("here****");
            var arr = data.response.member_profile.positions.position;
            for(var i = 0; i < arr.length; i++){
              var tmp = arr[i]["@attributes"];
              output.positions.push(tmp);
            }
          }
          request(topCompanies, collectCompanies);
        } catch( err ) {
          console.error(err);
        }
    };

    request(positions, collectPositions);
};
