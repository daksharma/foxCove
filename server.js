var express = require('express');
require('dotenv').config();
var request = require('request');
var path = require('path');
var convert = require('x2js');
var favicon = require('serve-favicon');
var govTrack = require('govtrack-node');
var models = require('./db/pg-models');
var civicInfo = require('civic-info')({apiKey: 'AIzaSyC-vnNvHhV7SzFMEA2mXaP3Eo05RakGXqA'}); // <-- ¯\_(ツ)_/¯
var mongoDb = require('./db/mdb-config');
var bookshelf = require('./db/pg-db-config');
var getRep = require('./server/modules/get-rep');
var collections = require('./db/pg-collections');
var bodyParser = require('body-parser');
var sponsorship = require('./server/modules/sponsorship-history');
var newsfeed = require('./server/modules/news-feed');
var info = require('./server/modules/basic-info');
var favicon = require('serve-favicon');
var govTrack = require('govtrack-node');
var civicInfo = require('civic-info')({apiKey: 'AIzaSyC-vnNvHhV7SzFMEA2mXaP3Eo05RakGXqA'});
var localReps = require('./server/modules/local-officials');
var https = require('https');
var info = require('./server/modules/basic-info');
var billSum = require('./server/modules/bill-summary');
var pollWiki = require('./server/modules/get-wiki');
var getReps = require('./server/modules/get-reps');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(favicon(__dirname + '/client/images/favicon.ico'));
app.use(express.static(path.join(__dirname, '/client')));

app.post('/getLocalReps', function(req, res){
    // console.log("HELLO")
    // var inputPackage = req.body;
    // console.log(inputPackage)
    // var outputPackage = {};
    // localReps.getOfficials(inputPackage, outputPackage, function(){
    //     res.send(outputPackage)
    // })
});


//IGNORE FOR NOW!!! It's a total failure :(
app.post('/getVotes', function(req, res){
    // govTrack.findVoteVoter({id: 31425718}, function(err, data){
    //     console.log("VOTE DATA:", data)
    //     res.send(data)
    // })
    govTrack.findPerson("P000523", function(err, data) {
        console.log(data);
        res.send(data);
    });
    // civicInfo.elections(function(error, data) {
    // console.log('whatever');
    // // res.send(JSON.stringify(data))
    // });
  //   civicInfo.voterInfo({electionID: '4000', address: '1500 Market Street, Philadelphia, PA'}, function(data) {
  // console.log(data);
// });
});

//this handler responds with detailed data for a given rep specified by client

// I depricated this with the getRep handler below. It uses our SQL db based on
// Sunlight Foundation's data. This one remains valid as it's a different
// dataset. -Casey

app.post('/getProfile', function(req, res){
    var inputPackage = req.body.inputPackage;
    var outputPackage = {};
    newsfeed.getNews(inputPackage, outputPackage, function(){
        info.getGovTrack(inputPackage, outputPackage, function(){
            res.send(outputPackage);
        });
    });
});

app.post('/getReps', function(req, res){
  getReps(req.body.zipcode, res, res.send.bind(res));
});

app.post('/getRep', function(req, res) {
  getRep(req.body.bioguide_id, res, function(data) {
    res.send(data);
  });
});

app.post('/getBio', function(req, res) {
  pollWiki(req.body.searchString, res, res.send.bind(res));
});

app.post('/sponsorship', function(req, res) {
  sponsorship(req.body.bioguide_id, res.send.bind(res));
});

app.post('/billSummary', function(req, res) {
  billSum.govTrackBillSummary(req.body.bill_id, res.send.bind(res));
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server started, listening on port:', port);
});
