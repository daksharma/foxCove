var model = require('../../db/pg-models');

module.exports = function(bioguide_id, res, callback){
  new model.Legislator({bioguide_id: bioguide_id})
  .fetch()
  .then(function(data, err) {
    if (err) {
      console.log('There was a problem with the data provider.');
      res.statusCode(500);
    } else {
      var obj = {};
      obj.rep = data;
      callback(obj);
    }
  });
};
