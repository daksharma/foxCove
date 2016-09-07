var https = require('https');

// Makes API GET request to Wikipedia and returns introduction section
module.exports = function(searchString, res, callback) {
  return https.get({
    hostname: 'en.wikipedia.org',
    path: '/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&titles=' + searchString
  },
  function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    }).on('error', function(err) {
      console.log(err);
      res.sendStatus(500);
    });
    res.on('end', function() {
      try {
        var parsed = JSON.parse(body);
        bio = parsed.query.pages[Object.keys(parsed.query.pages)[0]].extract;
        if (bio.includes('From a page move') || bio.includes('may refer to:')) {
          callback('');
        } else {
          callback(bio);
        }
      } catch( err ) {
        console.log('There was a problem with Wikipedia.');
        callback('');
      }
    });
  });
};
