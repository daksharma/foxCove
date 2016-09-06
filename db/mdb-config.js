var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_DB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Something went wrong with MongoDB.'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

/*

Hi! I'm your friendly, go with the flow Mongo database. You can use me for all sorts
of stuff: Bill data, State Capitols, parking hours. All you have to do is make
a schema to get started, and my model-based record management is a snap to use.

For now let's keep the schemas here, but, like children, in time they will move out.

*/

var sampleSchema = mongoose.Schema({
    name: String,
    friends: {type: String, default: 'Not many, tbh.'},
    list: {type: [], default: ['apparently', 'array', 'is', 'a', 'datatype']}
    // More schema options live here. Sky's the limit.
});

// This is where we produce models from schemas:

var Sample = mongoose.model('Sample', sampleSchema);


var userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    following: {
        type: []
    }
})

var User = mongoose.model('User', userSchema);

var commentSchema = mongoose.Schema({
    page: String,
    username: String,
    timestamp: String,
    content: String
})

var Comment = mongoose.model('Comment', commentSchema)






// State Reps Below

var stateRepSchema = mongoose.Schema({
  leg_id: String,
  photo_url: String,
  name: String,
  firstname: String,
  nickname: String,
  middlename: String,
  lastname: String,
  name_suffix: String,
  party: String,
  state: String,
  district: String,
  chamber: String,
  in_office: Boolean,
  phone: String,
  fax: String,
  website: String,
  webform: String,
  congress_office: String,
  transparencydata_id: String,
  oc_email: String,
  sponsored: [{}]
});

var StateRep = mongoose.model('StateRep', stateRepSchema);

db.saveStateRep = function(req,res) {
  console.log(req.body)
  var current = req.body;
  var newStateRep = new StateRep({
    leg_id: current.id,
    photo_url: current.photo_url,
    name: current.full_name,
    firstname: current.first_name,
    nickname: current.nickname,
    middlename: current.middle_name,
    lastname: current.last_name,
    name_suffix: current.suffixes,
    party: current.party,
    state: current.state,
    district: current.district,
    chamber: current.chamber,
    in_office: current.active,
    phone: current.phone,
    fax: current.fax,
    website: current.url,
    congress_office: current.offices,
    transparencydata_id: current.transparencydata_id,
    oc_email: current.email
  });

    newStateRep.save(function(err, rep) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(rep);
    }
  });
};

db.getStateRep = function(req, res) {
  StateRep.findOne({leg_id: req.body.leg_id}).exec(function(err, rep) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(rep);
    }
  })
};

db.updateStateRep = function(req, res) {
  var query = {leg_id: req.body.leg_id}
  StateRep.update(query, ...req.body.fields, function(err, rep) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(rep);
    }
  })
};



module.exports = db;
