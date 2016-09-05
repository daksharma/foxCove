var https   = require('https');
var fs      = require('fs');
var express = require('express');
var path    = require('path');
var app     = require('../../server');

// This module is not presently active due to technical problems. See the same routine on server.js.

module.exports = function(req, res, cb) {
  var mapPath = 'map' + req.body[0] + req.body[1] + '.png';
  var cartography = function() {
    https.get({
      hostname: 'api.mapbox.com',
      path: '/v4/mapbox.wheatpaste/' + req.body[0] + ',' + req.body[1] + ',13/750x350.png32?access_token=' + process.env.MAPBOX_API
    }, function(res) {
      if (res) {
        res.pipe(
          fs.createWriteStream(
            __dirname + '/client/images/maps/' + mapPath
          )
        );
        cb(mapPath);
        return mapPath;
      } else {
        console.log('Something went wrong.');
        return false;
      }
    });
  };
  cartography();
};
