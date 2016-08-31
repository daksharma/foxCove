var express = require('express');
var https = require('https');
var mongoDb = require('./db/mdb-config');
var bookshelf = require('./db/pg-db-config');
var models = require('./db/pg-models');
var collections = require('./db/pg-collections');
var request = require('request');
var path = require('path');
var convert = require('x2js');
var bodyParser = require('body-parser');
var key = require('./server/secret/api-keys');
var sponsorship = require('./server/modules/sponsorship-history');
var newsfeed = require('./server/modules/news-feed');
var info = require('./server/modules/basic-info')
var favicon = require('serve-favicon');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(favicon(__dirname + '/client/images/favicon.ico'));
app.use(express.static(path.join(__dirname, '/client')));

//this handler responds with detailed data for a given rep specified by client

// I depricated this with the getRep handler below. It uses our SQL db based on
// Sunlight Foundation's data. This one remains valid as it's a different
// dataset. -Casey

app.post('/getProfile', function(req, res){
    var inputPackage = req.body.inputPackage;
    var outputPackage = {};
    newsfeed.getNews(inputPackage, outputPackage, function(){
        info.getGovTrack(inputPackage, outputPackage, function(){
            res.send(outputPackage)
        })
    })

});

//this handler responds with all reps in a given zipcode from client
app.post('/getReps', function(req, res){
  var zip = req.body.zipcode; //front end request should be in the format {zipcode: zipcode}
  // This (▽) is not pretty. There is a better way to write it. Bookshelf is difficult. Call it a first draft.
  var repLookup = 'select bioguide_id, firstname, lastname, title, Zips.district, party from Legislators, Zips where Zips.zipcode = ' + zip + ' and Legislators.in_office = \'1\' and Legislators.state = Zips.state and (Legislators.district = Zips.district or length(Legislators.district) > 2)';
  bookshelf.knex.raw(repLookup)
    .then(function(data, err) {
      if (err) {
        console.log('There was a problem with that request.');
        res.sendStatus(500);
      } else {
        var dupCheck = []
        var obj = {};
        obj.reps = [];
          for(var i = 0; i < data.rows.length; i++){
            var person = data.rows[i]
            if (dupCheck.indexOf(person.bioguide_id) < 0) {
              dupCheck.push(person.bioguide_id);
              var package = {};
              package.bioguide_id = person.bioguide_id;
              package.name = person.firstname + " " + person.lastname;
              package.title = person.title === "Sen" ?  "Senator" : "Representative";
              package.district = person.district;
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
          }
        res.send(obj);
      }
    })
});

app.post('/getRep', function(req, res){
  var bioguide_id = req.body.bioguide_id; //front end request should be in the format {bioguide_id: bioguide_id}
  new models.Legislator({bioguide_id: bioguide_id})
    .fetch()
    .then(function(data, err) {
      if (err) {
        console.log('There was a problem with the data provider.');
        res.sendStatus(500);
      } else {
        var obj = {};
        obj.rep = data;
        res.send(obj);
      }
    });
});

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
      }).on('error', function(err) {
        console.log(err);
        res.sendStatus(500);
      });
      res.on('end', function() {
        if (!body.includes('<')) {
          var parsed = JSON.parse(body);
          bio = parsed.query.pages[Object.keys(parsed.query.pages)[0]].extract;
          cb(bio);
        } else {
          console.log('There was a problem with Wikipedia');
        }
      });
    });
  }
  pollWiki(res.send.bind(res));
});

app.listen(3000, function(){
  console.log('server started...');
});
