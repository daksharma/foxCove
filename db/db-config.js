var mongoose = require('mongoose');
var mongo = require('./uri-config.js');

var uri = mongo.getUri();

mongoose.connect(uri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Something went wrong with MongoDB.'));
db.once('open', function() {
  console.log('Database is connected.');
});

// Define schemas

var usSenSchema = mongoose.Schema({
    name: String
    // schema options live here
});

var usRepSchema = mongoose.Schema({
    name: String
    // schema options live here
});

// Produce models from schemas

var Senator = mongoose.model('Senator', usSenSchema);
var Representative = mongoose.model('Representative', usSenSchema);

module.exports = db;