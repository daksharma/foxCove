var express = require('express');
var key = require('./server/secret/api-keys');
var sponsorship = require('./server/modules/sponsorship-history');
var db = require('./db/db-config.js');
var request = require('request');
var path = require('path');
var convert = require('x2js');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, '/client')));

//this handler responds with detailed data for a given rep specified by client
app.post('/getProfile', function(req, res){
    var rep = req.body.bioguide_id; //front end request should be in the format {bioguide_id: idNumber}
    request('https://www.govtrack.us/api/v2/role?current=true', function(error, response, data){
        data=JSON.parse(data)
        var result = data.objects.filter(function(currentValue){
            if(currentValue.person.bioguideid === rep){
                return true;
            }
            return false
        })

        res.send(result)

    })

})

//this handler responds with all reps in a given zipcode from client
app.post('/getReps', function(req, res){
    var zip = req.body.zipcode //front end request should be in the format {zipcode: zipcode}
    request('https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zip + '&apikey=fca53d5418a64a6a81b29bb71c97b9a1', function(error, response, data){
        data = JSON.parse(data);
        var obj = {};
        obj.reps = [];
        for(var i = 0; i < data.results.length; i++){
            var package = {};
            var person = data.results[i]
            package.bioguide_id = person.bioguide_id;
            package.name = person.first_name + " " + person.last_name;
            package.title = person.title === "Sen" ?  "Senator" : "Representative";
            package.district = person.district;
            package.email = person.oc_email;
            package.twitter = person.twitter_id;
            package.website = person.website;
            if(person.party === "R"){
                package.affiliation = "Republican"
            }
            else if (person.party === "D"){
                package.affiliation = "Democrat"
            }
            else{
                package.affiliation = "Independent"
            }
            obj.reps.push(package)
        }
        console.log(obj)
        res.send(obj)
    })
});

app.listen(3000, function(){console.log('server started...')});
