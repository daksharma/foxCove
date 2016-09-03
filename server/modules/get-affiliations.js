var request = require('request');

module.exports = function(req, res){

    var input = req.body;
    var output = {};

    var destination = 'http://www.opensecrets.org/api/?method=memPFDprofile&year=2013&cid=' + input.crp_id + '&output=json&apikey=' + process.env.OPENSECRETS_API;

    // console.log(destination)

    var requestCallback = function(error, response, data){
        if (error) throw error;
        data = JSON.parse(data);
        output.positions = [];
        if(data.response.member_profile.positions){
            console.log("here****")
            var arr = data.response.member_profile.positions.position;
            for(var i = 0; i < arr.length; i++){
                var tmp = arr[i]["@attributes"]
                output.positions.push(tmp)
           }   
        }
        res.send(output)
    }

    request(destination, requestCallback)
}