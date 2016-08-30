var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Something went wrong with MongoDB.'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
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
