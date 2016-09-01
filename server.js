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
var getProfile = require('./server/modules/get-profile');
var getVotes = require('./server/modules/get-votes');
var getLocalReps = require('./server/modules/get-local-reps');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(favicon(__dirname + '/client/images/favicon.ico'));
app.use(express.static(path.join(__dirname, '/client')));

app.post('/getLocalReps', function(req, res){

});

//IGNORE FOR NOW!!! It's a total failure :(
app.post('/getVotes', function(req, res){
    getVotes(res, req);
});

app.post('/getProfile', function(req, res){
    getProfile(req, res);
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
