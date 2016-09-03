var request = require('request')
var capitalize = require('./capitalize')
module.exports = function(req, res){
    // console.log(req.body)
    var input = req.body;
    var output = {};
    var destination = 'https://taxrates.api.avalara.com:443/postal?country=usa&postal='+ input.zip + '&apikey=' + process.env.TAX_API;


    var requestCallback = function(error, response, data){
        if(error) throw error;
        data = JSON.parse(data);
        output.total = data.totalRate;
        output.breakdowns = [];
        var arr = data.rates;
        for(var i = 0; i < arr.length; i++){
            var str = capitalize(arr[i].name) + " " + arr[i].type + " tax: " + arr[i].rate + "%"
            output.breakdowns.push(str)
        }
        res.send(output)
    }

    request(destination, requestCallback)

}