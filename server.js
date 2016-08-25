var express = require('express');
var db = require('./db/db-config.js')
var request = require('request')
var path = require('path');
var convert = require('x2js');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static(path.join(__dirname, '/client')))

app.listen(3000, function(){console.log('server started...')})
