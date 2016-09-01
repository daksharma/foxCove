// NODE MODULES
require('dotenv').config();
<<<<<<< 24af15503072acadb25a11e7eb44af254d1395a5
var express       = require('express');
var request       = require('request');
var path          = require('path');
var favicon       = require('serve-favicon');
var bodyParser    = require('body-parser');
var https         = require('https');
var fs            = require('fs');

// DB MODULES
var mongoDb       = require('./db/mdb-config');

// SERVER REQUEST HANDLER MODULES
var sponsorship   = require('./server/modules/sponsorship-history');
var newsfeed      = require('./server/modules/news-feed');
var info          = require('./server/modules/basic-info');
var localReps     = require('./server/modules/local-officials');
var getRep        = require('./server/modules/get-rep');
var billSum       = require('./server/modules/bill-summary');
var pollWiki      = require('./server/modules/get-wiki');
var getReps       = require('./server/modules/get-reps');
var getProfile    = require('./server/modules/get-profile');
var getVotes      = require('./server/modules/get-votes');
var getLocalReps  = require('./server/modules/get-local-reps');
var getSalesTax   = require('./server/modules/local-tax')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(favicon(__dirname + '/client/images/favicon.ico'));
app.use(express.static(path.join(__dirname, '/client')));

app.post('/getLocalReps', function(req, res){
    getLocalReps(req, res);
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

app.post('/getBio', function(req, res) { //front end request should be in the format {searchString: searchString}
  var bio;
  var pollWiki = function(cb) {
    return https.get({
      hostname: 'en.wikipedia.org',
      path: '/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&titles=' + req.body.searchString
    }, function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        if (!body.includes('<')) {
          var parsed = JSON.parse(body);
          bio = parsed.query.pages[Object.keys(parsed.query.pages)[0]].extract;
          cb(bio);
        }
      }).on('error', function(err) {
        console.log(err);
        res.sendStatus(500);
      });
    });
  };
  pollWiki(res.send.bind(res));
});

// This bad boy uses {zipcode: zipcode} from getReps as part of a cascading search,
// but it can be repurposed for Address Specific calls. It takes any string,
// in this case a ZIP code, and retrieves longitude and latitude. It can be used
// with a street address or anything you're into.

app.post('/getGeo', function(req, res) {
  var geo;
  var geocoding = function(cb) {
    return https.get({
      hostname: 'api.mapbox.com',
      path: '/geocoding/v5/mapbox.places/' + req.body.zipcode + '.json?access_token=' + process.env.MAPBOX_API
    }, function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        if (!body.includes('<')) {
          var parsed = JSON.parse(body);
          geo = parsed.features[0].geometry.coordinates;
          cb(geo);
        }
      }).on('error', function(err) {
        console.log(err);
        res.sendStatus(500);
      });
    });
  };
  geocoding(res.send.bind(res));
});

// But wait, there's more. Another call to the same API for the map itself. I'm going to bring
// that first lookup in-house to save a few lines if the time outs, but the political zipcode
// data lacks lat/lon, and the alternative lacks districts. Learn your junction tables, kids.

app.post('/getMap', function(req, res) {
  var map;
  var cartography = function(cb) {
    console.log(req.body)
    return https.get({
      hostname: 'api.mapbox.com',
      path: '/v4/mapbox.wheatpaste/' + req.body[0] + ',' + req.body[1] + ',6/750x350.png?access_token=' + process.env.MAPBOX_API
    }, function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        map = body.replace(/^data:image\/png;base64,/, '');  // Capture raw png, subtract header
        cb(map);
      }).on('error', function(err) {
        console.log(err);
        res.sendStatus(500);
      });
    });
  };
  cartography(function(map) {
    var mapPath = 'map' + req.body[0] + req.body[1];
    fs.writeFile(__dirname + '/client/images/maps/' + mapPath + '.png', map, 'base64', function(err) {
      if (err) throw err;
      res.send(mapPath)
    }.bind(res));
  });
});

// This bad boy uses {zipcode: zipcode} from getReps as part of a cascading search,
// but it can be repurposed for Address Specific calls. It takes any string,
// in this case a ZIP code, and retrieves longitude and latitude. It can be used
// with a street address or anything you're into.

app.post('/getGeo', function(req, res) {
  var geo;
  var geocoding = function(cb) {
    return https.get({
      hostname: 'api.mapbox.com',
      path: '/geocoding/v5/mapbox.places/' + req.body.zipcode + '.json?access_token=' + process.env.MAPBOX_API
    }, function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        if (!body.includes('<')) {
          var parsed = JSON.parse(body);
          geo = parsed.features[0].geometry.coordinates;
          cb(geo);
        }
      }).on('error', function(err) {
        console.log(err);
        res.sendStatus(500);
      });
    });
  };
  geocoding(res.send.bind(res));
});

// But wait, there's more. Another call to the same API for the map itself. I'm going to bring
// that first lookup in-house to save a few lines if the time outs, but the political zipcode
// data lacks lat/lon, and the alternative lacks districts. Learn your junction tables, kids.

app.post('/getMap', function(req, res) {
  var map;
  var cartography = function(cb) {
    console.log(req.body)
    return https.get({
      hostname: 'api.mapbox.com',
      path: '/v4/mapbox.wheatpaste/' + req.body[0] + ',' + req.body[1] + ',6/750x350.png?access_token=' + process.env.MAPBOX_API
    }, function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });
      res.on('end', function() {
        var mapPath = 'map' + req.body[0] + req.body[1] + '.png';
        fs.writeFile(__dirname + '/client/images/maps/' + mapPath, body.replace(/^data:image\/png;base64,/, ''), 'base64', function(err) {
          if (err) throw err;
            console.log(mapPath)
            cb(mapPath)
          })
      }).on('error', function(err) {
        console.log(err);
        res.sendStatus(500);
      });
    });
  };
  cartography(res.send.bind(res));
});

app.post('/billSummary', function(req, res) {
  billSum.govTrackBillSummary(req.body.bill_id, res.send.bind(res));
});

app.post('/getSalesTax', function(req, res) {
  getSalesTax(req, res)
})
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server started, listening on port:', port);
});
