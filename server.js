// NODE MODULES
require('dotenv').config();
var express          = require('express');
var request          = require('request');
var path             = require('path');
var favicon          = require('serve-favicon');
var bodyParser       = require('body-parser');
var https            = require('https');
var fs               = require('fs');

// DB MODULES
var mongoDb          = require('./db/mdb-config');
var collections      = require('./db/pg-collections');
var models           = require('./db/pg-models');
var bookshelf        = require('./db/pg-db-config');

// SERVER REQUEST HANDLER MODULES
var newsfeed         = require('./server/modules/news-feed');
var info             = require('./server/modules/basic-info');
var localReps        = require('./server/modules/local-officials');
var getRep           = require('./server/modules/get-rep');
var getStateRep      = require('./server/modules/get-state-rep');
var pollWiki         = require('./server/modules/get-wiki');
var getReps          = require('./server/modules/get-reps');
var getProfile       = require('./server/modules/get-profile');
var getVotes         = require('./server/modules/get-votes');
var getLocalReps     = require('./server/modules/get-local-reps');
var getSalesTax      = require('./server/modules/local-tax');
var getLocalMap      = require('./server/modules/get-local-map');
var getLocalGeoData  = require('./server/modules/get-local-geo');
var getAffiliation   = require('./server/modules/get-affiliations');
var getStateLegs     = require('./server/modules/get-state-legs');
var bills            = require('./server/modules/bills');
var getComments      = require('./server/modules/comments-modules/get-comments');
var postComment      = require('./server/modules/comments-modules/post-comment');
var deleteComment    = require('./server/modules/comments-modules/delete-comment');

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
  getRep(req.body.bioguide_id, res, res.send.bind(res));
});

app.post('/getStateRep', function(req, res) {
  getStateRep.rep(req.body.leg_id, res, res.send.bind(res));
});

app.get('/getStateRepRecord', function(req, res) {
  mongoDb.getStateRep(req, res, res.send.bind(res));
});

app.post('/saveStateRepRecord', function(req, res) {
  mongoDb.saveStateRep(req, res, res.send.bind(res));
});

// app.post('/updateStateRepRecord', function(req, res) {
//   mongoDb.updateStateRep(req, res, res.send.bind(res));
// });

app.post('/getStateRepBills', function(req, res) {
  getStateRep.bills(req.body.leg_id, res, res.send.bind(res));
});

app.post('/getBio', function(req, res) {
  pollWiki(req.body.searchString, res, res.send.bind(res));
});

app.post('/getGeo', function(req, res) {
  getLocalGeoData(req, res, res.send.bind(res));
});

app.post('/getSalesTax', function(req, res) {
  getSalesTax(req.body.zip, res.send.bind(res));
});

app.post('/getRepAffiliation', function(req, res) {
  getAffiliation(req, res);
});

app.post('/billSummary', function(req, res) {
  bills.summary(req.body.congress, req.body.type, req.body.number, res.send.bind(res));
});

app.post('/getBills', function(req, res) {
  bills.history(req.body.bioguideId, res.send.bind(res));
});

app.post('/billInfo', function(req, res) {
  bills.info(req.body.congress, req.body.type, req.body.number, res.send.bind(res));
});

app.post('/getStateLegs', function(req, res) {
  getStateLegs(req, res, res.send.bind(res));
});

app.post('/getComments', function(req, res) {
  getComments(req, res);
});

app.post('/postComment', function(req, res) {
  postComment(req, res);
});

app.post('/deleteComment', function(req, res) {
  deleteComment(req, res)
})

app.post('/getRepNews', function(req, res) {
  newsfeed.makeBingApiCall(req.body.titleAndRepName, req.body.bioguide_id, res.send.bind(res));
});

app.get('/getRepNewsArticles', function(req, res) {
  mongoDb.getRepNewsArticle(req, res.send.bind(res));
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
          path: '/v4/mapbox.wheatpaste/' + req.body[0] + ',' + req.body[1] + ',14/750x500.png64?access_token=' + process.env.MAPBOX_API
        }, function(res) {
          if (res) {
            res.pipe(
              fs.createWriteStream(
                __dirname + '/client/images/maps/' + mapPath
              ).on('finish', function() {
                cb(mapPath);
                return mapPath;
              }.bind(res))
            );
          } else {
            console.log('Something went wrong.');
            return false;
          }
        });
      }
    });
  };
  cartography(res.send.bind(res));
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server started, listening on port:', port);
});
