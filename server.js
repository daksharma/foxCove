var express = require('express');
//db
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

app.post('/getReps', function(req, res){
    var zip = req.body.zipcode //front end request should be in the format {zipcode: zipcode}
    request('https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zip + '46240&apikey=fca53d5418a64a6a81b29bb71c97b9a1', function(data){
        res.send(data)
        })
})
app.listen(3000, function(){console.log('server started...')})

