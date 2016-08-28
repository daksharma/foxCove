var express = require('express');
var db = require('./db/db-config.js');
var request = require('request');
var path = require('path');
var convert = require('x2js');
var bodyParser = require('body-parser');
var key = require('./server/secret/api-keys');
var sponsorship = require('./server/modules/sponsorship-history');
var newsfeed = require('./server/modules/news-feed');
var info = require('./server/modules/basic-info')


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, '/client')));

//this handler responds with detailed data for a given rep specified by client
app.post('/getProfile', function(req, res){
    var inputPackage = req.body.inputPackage;
    var outputPackage = {};
    newsfeed.getNews(inputPackage, outputPackage, function(){
        info.getGovTrack(inputPackage, outputPackage, function(){
            res.send(outputPackage)
        })
    })

})

//this handler responds with all reps in a given zipcode from client
app.post('/getReps', function(req, res){
    var zip = req.body.zipcode //front end request should be in the format {zipcode: zipcode}
    console.log(req.body.zipcode);
    var zip = req.body.zipcode; //front end request should be in the format {zipcode: zipcode}
    request('https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zip + '&apikey=fca53d5418a64a6a81b29bb71c97b9a1', function(error, response, data){
        if (!data.includes('<')) {
            data = JSON.parse(data);
            var obj = {};
            obj.reps = [];
            for(var i = 0; i < data.results.length; i++){
                var package = {};
                var person = data.results[i];
                package.bioguide_id = person.bioguide_id;
                package.name = person.first_name + " " + person.last_name;
                package.title = person.title === "Sen" ?  "Senator" : "Representative";
                package.district = person.district;
                package.email = person.oc_email;
                package.twitter = person.twitter_id;
                package.website = person.website;
                if(person.party === "R"){
                    package.affiliation = "Republican";
                }
                else if (person.party === "D"){
                    package.affiliation = "Democrat";
                }
                else{
                    package.affiliation = "Independent";
                }
                obj.reps.push(package);
            }
            console.log(obj);
            res.send(obj);
        } else {
            console.log('There was a problem with the data provider.');
            res.sendStatus(500);
        }
    });
});

app.listen(3000, function(){
  console.log('server started...');
});
