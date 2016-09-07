var db = require('../../../db/mdb-config');

module.exports = function(req, res) {
  db.getComments(req, res);
};