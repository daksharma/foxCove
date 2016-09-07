var db = require('../../../db/mdb-config');


module.exports = function (req, res) {
  db.deleteComment(req, res);
}

