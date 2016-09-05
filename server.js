// NODE MODULES
require('dotenv').config();
var express       = require('express');
var request       = require('request');
var path          = require('path');
var favicon       = require('serve-favicon');
var bodyParser    = require('body-parser');
var https         = require('https');
var fs            = require('fs');

// DB MODULES
var mongoDb     = require('./db/mdb-config');
var collections = require('./db/pg-collections');
var models      = require('./db/pg-models');
var bookshelf   = require('./db/pg-db-config');



// SERVER REQUEST HANDLER MODULES
var sponsorship      = require('./server/modules/sponsorship-history');
var newsfeed         = require('./server/modules/news-feed');
var info             = require('./server/modules/basic-info');
var localReps        = require('./server/modules/local-officials');
var getRep           = require('./server/modules/get-rep');
var billSum          = require('./server/modules/bill-summary');
var pollWiki         = require('./server/modules/get-wiki');
var getReps          = require('./server/modules/get-reps');
var getProfile       = require('./server/modules/get-profile');
var getVotes         = require('./server/modules/get-votes');
var getLocalReps     = require('./server/modules/get-local-reps');
var getSalesTax      = require('./server/modules/local-tax')
var getLocalMap      = require('./server/modules/get-local-map');
var getLocalGeoData  = require('./server/modules/get-local-geo');
var getAffiliation   = require('./server/modules/get-affiliations');
var getRepBills      = require('./server/modules/get-bills');
var getSummary       = require('./server/modules/get-summary');
var getStateLegs     = require('./server/modules/get-state-legs');

var app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(favicon(__dirname + '/client/images/favicon.ico'));
app.use(express.static(path.join(__dirname, '/client')));

app.post('/getLocalReps', function(req, res){
    getLocalReps(req, res);
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
  sponsorship(req.body.bioguide_id, function(sponsorshipHist) {
    var bills = JSON.parse(sponsorshipHist).results;
    bills.forEach(function(bill, i){
      getSummary(bill.congress, bill.bill_type, bill.number, function(data){
        bill.summary = data;
        if( i === 4 ){
          res.send(bills);
        }
      });
    })
  });
});

app.post('/billSummary', function(req, res) {
  billSum.govTrackBillSummary(req.body.bill_id, res.send.bind(res));
});

app.post('/getGeo', function(req, res) {
  getLocalGeoData(req, res, res.send.bind(res));
});

app.post('/getSalesTax', function(req, res) {
  getSalesTax(req, res)
});

app.post('/getRepAffiliation', function(req, res) {
  getAffiliation(req, res)
});

app.post('/getBills', function(req, res) {
  getRepBills(req, res, res.send.bind(res));
});

app.post('/getStateLegs', function(req, res) {
  getStateLegs(req, res, res.send.bind(res));
});

// This routine is going to require some TLC to move. For some reason it
// loses write access to the filesystem when it goes to a module. TODO.

app.post('/getMap', function(req, res) {
  var mapPath = 'map' + req.body[0] + req.body[1] + '.png';
  var cartography = function(cb) {
  fs.stat(__dirname + '/client/images/maps/' + mapPath, function(err, stats) { // Check if map already exists
    if (!err) { // If yes return path
      cb(mapPath);
    } else { // If no make http call
        https.get({
          hostname: 'api.mapbox.com',
          path: '/v4/mapbox.wheatpaste/' + req.body[0] + ',' + req.body[1] + ',14/750x750.png64?access_token=' + process.env.MAPBOX_API
        }, function(res) {
          if (res) {
            res.pipe(
              fs.createWriteStream(
                __dirname + '/client/images/maps/' + mapPath
              )
            );
            cb(mapPath);
            return mapPath;
          } else {
            console.log('Something went wrong.');
            return false;
          }
        })
      }
    });
  };
  cartography(res.send.bind(res));
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server started, listening on port:', port);
});
