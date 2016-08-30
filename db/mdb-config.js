var mongoose = require('mongoose');
var config = require('./uri-config.js');

mongoose.connect(config.mongoUri);

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

module.exports = db;