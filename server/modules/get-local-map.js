var https         = require('https');
var fs            = require('fs');

module.exports = function(req, res, cb) {
  var map;
  var cartography = function() {
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
        // fs.writeFile(__dirname + '/client/images/maps/' + mapPath, body.replace(/^data:image\/png;base64,/, ''), 'base64', function(err) {
        //   if (err) throw err;
        //     console.log(mapPath)
        //     cb(mapPath)
        //   })
      }).on('error', function(err) {
        console.log(err);
        res.sendStatus(500);
      });
    });
  };
  cartography();
};