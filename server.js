var express = require('express');
//db
var request = require('request');
var path = require('path');
var convert = require('x2js');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, '/client')));

var port = server.env.PORT || 3000;
app.listen(port, function(){console.log('server started...')});
