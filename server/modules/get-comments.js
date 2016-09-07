var db = require('../../db/mdb-config');

module.exports = function(req, res) {

  db.getComments(req, res);
  res.send({comments: [{
    content: "hello",
    username: "ladyfox",
    time:"9/6/2016 14:48:10"
  },
  {
    content: "hi",
    username: "ladyfox",
    time:"9/6/2016 14:55:10"
  }
  ]});
};